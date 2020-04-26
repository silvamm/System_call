const express = require('express')
const router = express.Router()
const superagent = require('superagent')

router.get('/', (req, res) => res.render('login/index', { layout: 'login' }))

router.post('/', (req, res) => {
    superagent
        .post('https://softrec.com.br/login/')
        .send(req.body)
        .end((error, result) => {
            if (error) res.sendStatus(error.status)

            req.session.nome = result.body.nome
            req.session.email = result.body.email
            if (result.body.tipo == 'ADMINISTRADOR') req.session.admin = true
            res.sendStatus(result.status)
        })
})

module.exports = router