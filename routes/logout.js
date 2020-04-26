const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    req.session.destroy((error) => error ? console.log(error) : res.redirect('/login'))
})

module.exports = router