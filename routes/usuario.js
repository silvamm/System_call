const express = require('express')
const superagent = require('superagent')

const router = express.Router()

router.get('/', (req, res) =>
    superagent
        .get('https://softrec.com.br/setor/')
        .end((error, result) => {
            if (error)
                console.log(error)

            let setores = result.body
            res.render('usuario/index', { setores })
        })
)

router.post('/', (req, res) => {
    superagent
        .post('https://softrec.com.br/usuario/')
        .send(req.body)
        .end((error, result) => {
            if (error) 
                res.sendStatus(error.status)
                
            res.sendStatus(200)
        })
})

module.exports = router
