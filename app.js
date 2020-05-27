const
    express = require('express'),
    hbs = require('express-handlebars'),
    app = express(),
    path = require('path'),
    session = require('express-session'),
    redis = require('redis')

//porta
const port = 3000
app.listen(port, () => console.log(`Funcionando | Porta : ${port}`))

//config recebendo dados do cliente
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//sessao
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

redisClient.on('error', err => console.log('Redis error: ', err))

//session com Redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'alpha dog',
        resave: false,
        saveUninitialized: true
    })
)

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

//autenticacao
global.auth = () => {
    return function(req, res, next) {
        if (!req.session || !req.session.email)
            return res.redirect('/login')
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
            },
            selected: function(selected, options) {
                return options.fn(this).replace(
                    new RegExp(' value=\"' + selected + '\"'),
                    '$& selected="selected"');
            },
            selected: function(key, value) {
                return key == value ? ' selected' : '';
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