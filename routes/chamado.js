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
            chamado.status = status

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
        usuario = req.session.usuario,
        query = {}

    query.protocolo = req.query.protocolo
    query.limite = req.query.limite ? req.query.limite : 10
    query.pagina = req.query.pagina ? req.query.pagina : 0

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
            paginacao = results[1].body

            return res.render('chamado/index', { setores, query, menu, paginacao })

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

            chamadoRest.get(req.params.id)
        ])
        .then((results) => {

            let chamado = results[0].body

            let usuario = req.session.usuario
            if (!usuario.admin)
                return res.render('chamado/visualizacao', { chamado })


            if (chamado.status == 'Pendente' && usuario.admin) {
                chamado.status = 'Visualizado'
                chamadoRest.put(chamado).end((error, result) => {
                    if (error)
                        console.log(error)
                    chamado = result.body
                })
            }

            return res.render('chamado/visualizacao', { chamado })

        })
        .catch((error) => console.log(error))

})

router.post('/', auth(), (req, res) => {

    let
        promise,
        chamado = req.body

    chamado.criadoPor.id = req.session.usuario.id

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