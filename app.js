const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const path = require('path')

const port = 3000

app.listen(port, () => console.log(`Funcionando | Porta : ${port}`))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//config handler-bars
app.set('views', path.join(__dirname , 'views'))
app.set('view engine', 'hbs')
app.engine('hbs',
     hbs({
        defaultLayout: 'main',
        helpers: {
            section: function (name, options) {
                if (!this.section) this.section = {}
                this.section[name] = options.fn(this)
                return;
            }
        },
        extname: 'hbs'
    })
)

//pasta de arquivos estaticos
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.static(path.join(__dirname , 'views')))

//rotas
app.get('/', (req, res) => res.redirect('/login'))
app.use('/login', require('./routes/login'))
app.use('/principal', require('./routes/principal'))
app.use('/usuario', require('./routes/usuario'))
