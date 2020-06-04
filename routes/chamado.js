const express = require('express')
const router = express.Router()

router.get('/lista', auth(), (req, res) => {
    res.render('chamado/index')
})

router.get('/', auth(), (req, res) => {
    res.render('chamado/formulario')
})

module.exports = router