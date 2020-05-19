const express = require('express')
const superagent = require('superagent')

const router = express.Router()

router.get('/', global.auth(), (req, res) => {
    superagent
        .get('https://softrec.com.br/setor/')
        .end((error, result) => {
            if (error)
                console.log(error)

            let setores = result.body
            res.render('usuario/formulario', { setores })
        })
})

router.get('/:id(\\d+)', global.auth(), (req, res) => {

    res.render('usuario/formulario')
})

router.get('/lista', global.auth(), (req, res) => {
    superagent
        .get('https://softrec.com.br/usuario/')
        .end((error, result) => {
            if (error)
                console.log(error)

            let usuarios = result.body
            usuarios.forEach(usuario =>
                usuario.tipo = usuario.tipo == 'NORMAL' ? 'Normal' : 'Administrador'
            )
            res.render('usuario/index', { usuarios })
        })
})

router.post('/', global.auth(), (req, res) => {
    superagent
        .post('https://softrec.com.br/usuario/')
        .send(req.body)
        .end((error, result) => {
            if (error) return res.sendStatus(error.status)
            res.sendStatus(200)
        })
})

router.delete('/:id', global.auth(), (req, res) => {
    superagent
        .delete('https://softrec.com.br/usuario/' + req.params.id)
        .end((error, result) => {
            if (error) return res.sendStatus(error.status)
            res.sendStatus('200')
        })
})

module.exports = router