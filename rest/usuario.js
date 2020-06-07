const
    superagent = require('superagent')


class UsuarioRest {

    list(query) {
        if (query)
            return superagent.get(global.url + '/usuario/query').send(query)
        else
            return superagent.get(global.url + '/usuario/')
    }

    get(id) {
        return superagent
            .get(global.url + '/usuario/' + id)
    }

    put(usuario) {
        return superagent
            .put(global.url + '/usuario/' + usuario.id)
            .send(usuario)
    }

    post(usuario) {
        return superagent
            .post(global.url + '/usuario/')
            .send(usuario)
    }
}

module.exports = new UsuarioRest()