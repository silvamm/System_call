const
    superagent = require('superagent')


class PredefinicaoRest {

    get(id) {
        return superagent.get(global.url + '/chamadopredefinido/' + id)
    }

    list() {
        return superagent.get(global.url + '/chamadopredefinido/')
    }

    post(predefinicao) {
        return superagent.post(global.url + '/chamadopredefinido/').send(predefinicao)
    }

    put(predefinicao) {
        return superagent.put(global.url + '/chamadopredefinido/' + predefinicao.id).send(predefinicao)
    }

    delete(id) {
        return superagent.delete(global.url + '/chamadopredefinido/' + id)
    }

}

module.exports = new PredefinicaoRest()