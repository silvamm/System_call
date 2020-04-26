const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const path = require('path')
const session = require('express-session')
const redis = require('redis')

const port = 3000
app.listen(port, () => console.log(`Funcionando | Porta : ${port}`))

//config recebendo dados do cliente
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//sessao
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

redisClient.on('error', err => console.log('Redis error: ', err))

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'alpha dog',
        resave: false,
        saveUninitialized: true
    })
)

//autenticacao
global.auth = () => {
    return function(req, res, next) {
        if (!req.session || !req.session.email)
            res.redirect('/login')
        next()
    }
}

//config handler-bars
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs',
    hbs({
        defaultLayout: 'main',
        helpers: {
            section: function(name, options) {
                if (!this.section) this.section = {}
                this.section[name] = options.fn(this)
                return;
            }
        },
        extname: 'hbs'
    })
)

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

//pasta de arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))

//rotas
app.get('/', (req, res) => res.redirect('/login'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/principal', require('./routes/principal'))
app.use('/usuario', require('./routes/usuario'))
app.use('/setor', require('./routes/setor'))