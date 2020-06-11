const
    express = require('express'),
    router = express.Router(),
    superagent = require('superagent')

router.get('/', (req, res) => res.render('login/index', { layout: 'login' }))

router.post('/', (req, res) => {

    superagent
        .post(global.url + '/login/')
        .send(req.body)
        .end((error, result) => {
            if (error) {

                console.log(error)
                let mensagem
                if (error.status == 404)
                    mensagem = "E-mail ou senha incorretos"

                return res.render('login/index', { layout: 'login', mensagem })
            }
            let usuario = {}
            usuario.nome = result.body.nome
            usuario.email = result.body.email
            usuario.id = result.body.id
            usuario.admin = result.body.tipo == 'ADMINISTRADOR' ? true : false

            req.session.usuario = usuario

            return res.redirect('/chamado/lista')
        })
})

module.exports = router