const
    express = require('express'),
    router = express.Router(),
    setorRest = require('../rest/setor.js'),
    menu = 'cadastro',
    submenu = 'setor'


router.get('/', auth(), (req, res) => {
    res.render('setor/formulario', { menu, submenu })
})

router.get('/:id(\\d+)', auth(), (req, res) => {
    setorRest
        .get(req.params.id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let setor = result.body
            res.render('setor/formulario', { setor, menu, submenu })
        });

})

router.post('/', auth(), (req, res) => {

    let
        promise,
        setor = req.body

    if (setor.id)
        promise = setorRest.put(setor)
    else
        promise = setorRest.post(setor)

    let
        redirect,
        mensagem,
        success

    promise
        .end((error, result) => {
            if (error) {
                console.log(error)
                success = false
                mensagem = error.response.body.message
                return res.render('notify/index', { redirect, success, mensagem, menu, submenu })
            }
            success = true
            redirect = '/setor/lista'
            return res.render('notify/index', { redirect, success, menu, submenu })
        })
})

router.get('/lista', auth(), (req, res) => {
    setorRest
        .list()
        .end((error, result) => {
            if (error) {
                console.log(error)
                return res.sendStatus(error.status)
            }
            let setores = result.body
            res.render('setor/index', { setores, menu, submenu })

        })
})

router.delete('/:id(\\d+)', auth(), (req, res) => {

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