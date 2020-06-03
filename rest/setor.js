const
    superagent = require('superagent')

class SetorRest {

    list() {
        return superagent
            .get(global.url + '/setor/')
    }

    get(id) {
        return superagent
            .get(global.url + '/setor/' + id)
    }

    put(setor) {
        return superagent
            .put(global.url + '/setor/' + setor.id)
            .send(setor)
    }

    post(setor) {
        return superagent
            .post(global.url + '/setor/')
            .send(setor)
    }

    delete(id) {
        return superagent
            .delete(global.url + '/setor/' + id)
    }
}

module.exports = new SetorRest()