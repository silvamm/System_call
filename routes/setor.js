const express = require('express')
const router = express.Router()
const superagent = require('superagent')

router.get('/', global.auth(), (req, res) => res.render('setor/index'))

router.post('/', global.auth(), (req, res) => {
    superagent
        .post('https://softrec.com.br/setor/')
        .send(req.body)
        .end((error, result) => {
            if (error)
                res.sendStatus(error.status)

            res.sendStatus(200)
        })
})

module.exports = router