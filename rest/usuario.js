const
    superagent = require('superagent')

class UsuarioRest {

    get(id) {
        return superagent
            .get('https://softrec.com.br/usuario/' + id)
    }

    put(usuario) {
        return superagent
            .put('https://softrec.com.br/usuario/' + usuario.id)
            .send(usuario)
    }

    post(usuario) {
        return superagent
            .post('https://softrec.com.br/usuario/')
            .send(usuario)
    }
}

module.exports = UsuarioRest