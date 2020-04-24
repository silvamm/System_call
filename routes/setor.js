const express = require('express')
const router = express.Router()
const superagent = require('superagent')

router.get('/', (req, res) => res.render('setor/index'))

router.post('/', (req, res) => {
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