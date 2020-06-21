const
    express = require('express'),
    problemaRest = require('../rest/problema.js'),
    router = express.Router(),
    menu = 'cadastro',
    submenu = 'problema'

router.get('/lista', auth(), (req, res) => {
    problemaRest.list().end((error, result) => {
        if (error) {
            console.log(error)
        }
        let problemas = result.body
        res.render('problema/index', { problemas, menu, submenu })
    })
})

router.get('/', auth(), (req, res) => {
    res.render('problema/formulario', { menu, submenu })
})

router.get('/:id(\\d+)', auth(), (req, res) => {
    problemaRest
        .get(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let problema = result.body
            res.render('problema/formulario', { problema, menu, submenu })
        })
})

router.post('/', auth(), (req, res) => {

    let
        promise,
        problema = req.body

    if (problema.id)
        promise = problemaRest.put(problema)
    else
        promise = problemaRest.post(problema)

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
                res.render('notify/index', { redirect, success, mensagem, menu, submenu })
            }
            success = true
            redirect = '/problema/lista'
            res.render('notify/index', { redirect, success, menu, submenu })
        })
})

router.delete('/:id(\\d+)', auth(), (req, res) => {

    problemaRest.delete(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            res.sendStatus('200')
        })

})

module.exports = router