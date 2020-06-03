const
    express = require('express'),
    router = express.Router(),
    setorRest = require('../rest/setor.js')


router.get('/', global.auth(), (req, res) => {
    res.render('setor/formulario')
})

router.get('/:id(\\d+)', global.auth(), (req, res) => {
    setorRest
        .get(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let setor = result.body
            res.render('setor/formulario', { setor })
        });

})

router.post('/', global.auth(), (req, res) => {

    let
        promise,
        setor = req.body

    if (setor.id)
        promise = setorRest.post(setor)
    else
        promise = setorRest.put(setor)

    let
        redirect,
        mensagem,
        success

    promise
        .end((error, result) => {
            if (error) {
                res.sendStatus(error.status)
                success = false
                mensagem = error.response.body.message
                res.render('notify/index', { redirect, success, mensagem })
            }
            success = true
            redirect = '/setor/lista'
            res.render('notify/index', { redirect, success })
        })
})

router.get('/lista', global.auth(), (req, res) => {
    setorRest
        .list()
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            let setores = result.body
            res.render('setor/index', { setores })

        })
})

router.delete('/:id', global.auth(), (req, res) => {

    setorRest.delete(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            res.sendStatus('200')
        })

})
module.exports = router