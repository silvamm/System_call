const
    express = require('express'),
    router = express.Router(),
    predefinicaoRest = require('../rest/predefinicao.js'),
    chamadoRest = require('../rest/chamado.js'),
    setorRest = require('../rest/setor.js')

router.get('/lista', auth(), (req, res) => {

    let
        chamados,
        setores,
        usuario = req.session.usuario,
        query = {}

    console.log(req.query)

    query.protocolo = req.query.protocolo

    if (req.query.setor)
        query.idSetor = req.query.setor.id

    if (req.query.status)
        query.status = req.query.status

    if (!usuario.admin)
        query.idUsuario = usuario.id

    console.log(query)

    Promise
        .all([
            setorRest.list(),
            chamadoRest.list(query)

        ])
        .then((results) => {
            setores = results[0].body
            chamados = results[1].body

            return res.render('chamado/index', { chamados, setores, query })

        }).catch(error => console.log(error))

})

router.get('/', auth(), (req, res) => {

    predefinicaoRest
        .list()
        .end((error, result) => {
            if (error) {
                console.log(error)
            }
            let predefinicoes = result.body
            res.render('chamado/formulario', { predefinicoes })
        })

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
                message = error.response.body.message
                return res.render('notify/', { success, message })
            }
            redirect = '/chamado/lista'
            res.render('notify/', { redirect, success })
        })

})

module.exports = router