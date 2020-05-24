const
    express = require('express'),
    superagent = require('superagent'),
    SetorRest = require('../rest/setor.js'),
    UsuarioRest = require('../rest/usuario.js'),
    router = express.Router()

router.get('/', global.auth(), (req, res) => {

    let setorRest = new SetorRest()

    setorRest
        .list()
        .then((result) => {
            let setores = result.body
            res.render('usuario/formulario', { setores })
        })

})

router.get('/:id(\\d+)', global.auth(), (req, res) => {

    let setores,
        usuario,
        setorRest = new SetorRest(),
        usuarioRest = new UsuarioRest()

    Promise
        .all([
            setorRest.list(),
            usuarioRest.get(req.params.id)
        ])
        .then((results) => {
            setores = results[0].body
            usuario = results[1].body
            res.render('usuario/formulario', { setores, usuario })
        })

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
    let usuarioRest = new UsuarioRest()
    let usuario = req.body
    console.log(usuario)
    if (usuario.id) {
        usuarioRest
            .put(usuario)
            .end((error, result) => {
                if (error) return res.sendStatus(error.status)
                res.sendStatus(200)
            })
    } else {
        usuarioRest
            .post(usuario)
            .end((error, result) => {
                if (error) return res.sendStatus(error.status)
                res.sendStatus(200)
            })
    }

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