$(function () {

    document.getElementById('form').addEventListener('submit', function (e) {
        e.preventDefault()
        var nome = document.getElementById('nome').value.trim()
        var email = document.getElementById('email').value.trim()
        var senha = document.getElementById('senha').value
        var tipo = document.getElementById('tipo').value
        var setor = {
            id: document.getElementById('setor').value
        }

        if (nome == '' || email == '' || senha == '') {
            document.getElementById('resposta').innerHTML = '<strong style="color: red;">Preencha todos os campos</strong>'
            return
        }

        if (!validacaoEmail(email)) {
            document.getElementById('resposta').innerHTML = '<strong style="color: red;">O e-mail é inválido</strong>'
            return
        }

        $.ajax({
            type: 'post',
            url: '/usuario/',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                tipo: tipo,
                setor: setor
            })
        }).done(function () {
            document.getElementById('resposta').innerHTML = '<strong style="color: green;">Cadastro realizado com sucesso!</strong>'
            document.getElementById('nome').value = ''
            document.getElementById('email').value = ''
            document.getElementById('senha').value = ''
        }).fail(function (jXHR) {
            if (jXHR != undefined)
                if (jXHR.status == 409)
                    document.getElementById('resposta').innerHTML = '<strong style="color: red;">O e-mail já esta cadastrado</strong>'
        })

    })

    function validacaoEmail(field) {
        usuario = field.substring(0, field.indexOf("@"));
        dominio = field.substring(field.indexOf("@") + 1, field.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (usuario.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return true
        }
        else {
            return false
        }
    }

})