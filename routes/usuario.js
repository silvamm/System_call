const
    express = require('express'),
    superagent = require('superagent'),
    setorRest = require('../rest/setor.js'),
    usuarioRest = require('../rest/usuario.js'),
    router = express.Router()

router.get('/', global.auth(), (req, res) => {

    setorRest
        .list()
        .then((result) => {
            let setores = result.body
            res.render('usuario/formulario', { setores })
        }).catch(error => console.log(error))

})

router.get('/:id(\\d+)', global.auth(), (req, res) => {

    let setores, usuario

    Promise
        .all([
            setorRest.list(),
            usuarioRest.get(req.params.id)
        ])
        .then((results) => {
            setores = results[0].body
            usuario = results[1].body
            console.log(usuario)
            res.render('usuario/formulario', { setores, usuario })
        }).catch(error => console.log(error))

})

router.get('/lista', global.auth(), (req, res) => {

    let setores, usuarios

    Promise
        .all([
            setorRest.list(),
            usuarioRest.list()
        ])
        .then((results) => {
            setores = results[0].body
            usuarios = results[1].body

            usuarios.forEach(usuario =>
                usuario.tipo = usuario.tipo == 'COMUM' ? 'Comum' : 'Administrador'
            )

            res.render('usuario/index', { usuarios, setores })

        }).catch(error => console.log(error))

})

router.post('/', global.auth(), (req, res) => {

    let
        promise,
        usuario = req.body

    if (usuario.id) {
        promise = usuarioRest
            .put(usuario)
    } else {
        promise = usuarioRest
            .post(usuario)
    }

    let
        success,
        mensagem,
        redirect

    promise
        .end((error, result) => {
            if (error) {
                console.log(error)
                success = false
                mensagem = error.response.body.message
                return res.render('notify/index', { redirect, success, mensagem })
            }
            success = true
            redirect = '/usuario/lista'
            res.render('notify/index', { redirect, success })
        })
})

router.delete('/:id(\\d+)', global.auth(), (req, res) => {

    superagent
        .delete('https://softrec.com.br/usuario/' + req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            res.sendStatus('200')
        })

})

module.exports = router