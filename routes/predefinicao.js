const
    express = require('express'),
    predefinicaoRest = require('../rest/predefinicao.js'),
    router = express.Router()

router.get('/lista', auth(), (req, res) => {
    predefinicaoRest.list().end((error, result) => {
        if (error) {
            console.log(error)
        }
        let predefinicoes = result.body
        res.render('predefinicao/index', { predefinicoes })
    })
})

router.get('/', auth(), (req, res) => {
    res.render('predefinicao/formulario')
})

router.get('/:id(\\d+)', auth(), (req, res) => {
    predefinicaoRest
        .get(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let predefinicao = result.body
            res.render('predefinicao/formulario', { predefinicao })
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
                res.render('notify/index', { redirect, success, mensagem })
            }
            success = true
            redirect = '/predefinicao/lista'
            res.render('notify/index', { redirect, success })
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