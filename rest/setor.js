const
    superagent = require('superagent')

class SetorRest {

    list() {
        return superagent
            .get('https://softrec.com.br/setor/')

    }
}

module.exports = SetorRest