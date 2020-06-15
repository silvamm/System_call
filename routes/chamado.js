const
    express = require('express'),
    router = express.Router(),
    problemaRest = require('../rest/problema.js'),
    chamadoRest = require('../rest/chamado.js'),
    setorRest = require('../rest/setor.js'),
    menu = 'chamado'

router.post('/status/:id(\\d+)', auth(), (req, res) => {

    let
        id = req.params.id,
        status = req.body.status

    chamadoRest
        .get(id)
        .end((error, result) => {
            if (error) {
                console.log(error)
            }

            let chamado = result.body

            if (status == 'VISUALIZADO' && chamado.status == 'PENDENTE') {
                chamado.status = status
            } else if (status == chamado.status) {
                return res.sendStatus(202);
            } else if (status != 'VISUALIZADO') {
                chamado.status = status
            }


            chamadoRest.put(chamado).end((error, result) => {
                if (error)
                    console.log(error)

                chamado = result.body
                return res.status(200).send(chamado);
            })
        })
})

router.get('/lista', auth(), (req, res) => {

    let
        chamados,
        setores,
        usuario = req.session.usuario,
        query = {}

    query.protocolo = req.query.protocolo

    if (req.query.setor)
        query.idSetor = req.query.setor.id

    if (req.query.status)
        query.status = req.query.status

    if (!usuario.admin)
        query.idUsuario = usuario.id

    Promise
        .all([
            setorRest.list(),
            chamadoRest.list(query)

        ])
        .then((results) => {
            setores = results[0].body
            chamados = results[1].body

            return res.render('chamado/index', { chamados, setores, query, menu })

        }).catch(error => console.log(error))

})

router.get('/', auth(), (req, res) => {

    problemaRest
        .list()
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let problemas = result.body
            res.render('chamado/formulario', { problemas, menu })
        })

})

router.get('/:id(\\d+)', auth(), (req, res) => {

    Promise
        .all([
            problemaRest.list(),
            chamadoRest.get(req.params.id)
        ])
        .then((results) => {
            let problemas = results[0].body
            let chamado = results[1].body

            console.log("GET ID")

            console.log(chamado)

            res.render('chamado/formulario', { chamado, problemas })


        })
        .catch((error) => console.log(error))

})

router.post('/', auth(), (req, res) => {

    let
        promise,
        chamado = req.body

    chamado.criadoPor.id = req.session.usuario.id

    if (chamado.id)
        promise = chamadoRest.put(chamado)
    else
        promise = chamadoRest.post(chamado)

    let
        redirect,
        message,
        success

    promise
        .end((error, result) => {
            success = error ? false : true
            if (error) {
                console.log(error)
                message = error.response.body.message
                return res.render('notify/', { success, message, menu })
            }
            redirect = '/chamado/lista'
            res.render('notify/', { redirect, success, menu })
        })

})

module.exports = router