const
    superagent = require('superagent')

class ProblemaRest {

    get(id) {
        return superagent.get(global.url + '/problema/' + id)
    }

    list() {
        return superagent.get(global.url + '/problema/')
    }

    post(problema) {
        return superagent.post(global.url + '/problema/').send(problema)
    }

    put(problema) {
        return superagent.put(global.url + '/problema/' + problema.id).send(problema)
    }

    delete(id) {
        return superagent.delete(global.url + '/problema/' + id)
    }

}

module.exports = new ProblemaRest()