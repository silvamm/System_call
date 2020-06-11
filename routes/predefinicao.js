const
    express = require('express'),
    predefinicaoRest = require('../rest/predefinicao.js'),
    router = express.Router(),
    menu = 'cadastro',
    submenu = 'predefinicao'

router.get('/lista', auth(), (req, res) => {
    predefinicaoRest.list().end((error, result) => {
        if (error) {
            console.log(error)
        }
        let predefinicoes = result.body
        res.render('predefinicao/index', { predefinicoes, menu, submenu })
    })
})

router.get('/', auth(), (req, res) => {
    res.render('predefinicao/formulario', { menu, submenu })
})

router.get('/:id(\\d+)', auth(), (req, res) => {
    predefinicaoRest
        .get(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let predefinicao = result.body
            res.render('predefinicao/formulario', { predefinicao, menu, submenu })
        })
})

router.post('/', auth(), (req, res) => {

    let
        promise,
        predefinicao = req.body

    if (predefinicao.id)
        promise = predefinicaoRest.put(predefinicao)
    else
        promise = predefinicaoRest.post(predefinicao)

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
            redirect = '/predefinicao/lista'
            res.render('notify/index', { redirect, success, menu, submenu })
        })
})

router.delete('/:id(\\d+)', global.auth(), (req, res) => {

    predefinicaoRest.delete(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            res.sendStatus('200')
        })

})

module.exports = router