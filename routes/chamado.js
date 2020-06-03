const express = require('express')
const router = express.Router()

router.get('/', auth(), (req, res) => {
    res.render('chamado/index')
})

module.exports = router