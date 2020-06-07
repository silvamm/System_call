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
            if (error) return res.sendStatus(error.status)

            let usuario = {}
            usuario.nome = result.body.nome
            usuario.email = result.body.email
            usuario.id = result.body.id
            usuario.admin = result.body.tipo == 'ADMINISTRADOR' ? true : false

            req.session.usuario = usuario

            res.sendStatus(result.status)
        })
})

module.exports = router