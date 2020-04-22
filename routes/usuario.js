const express = require('express')
const superagent = require('superagent')

const router = express.Router()

router.get('/', (req, res) =>
    superagent
        .get('https://softrec.com.br/setor/')
        .end((error, resultado) => {
            if (error) 
                console.log(error)
                
            let setores = resultado.body
            res.render('usuario/index', { setores })
        })
)

module.exports = router
