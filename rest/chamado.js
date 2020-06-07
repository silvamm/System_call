const
    superagent = require('superagent')

class ChamadoRest {

    get(id) {
        return superagent.get(global.url + '/chamado/' + id)
    }
    list(query) {
        if (query)
            return superagent.get(global.url + '/chamado/query').send(query)
        else
            return superagent.get(global.url + '/chamado/')
    }

    delete(id) {
        return superagent.delete(global.url + "/chamado/" + id)
    }

    post(chamado) {
        return superagent.post(global.url + "/chamado/").send(chamado)
    }

    put(chamado) {
        return superagent.put(global.url + "/chamado/" + chamado.id).send(chamado)
    }
}

module.exports = new ChamadoRest()