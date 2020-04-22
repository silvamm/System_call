$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'https://softrec.com.br/setor/',
        contentType: 'application/json',
        dataType: 'json'
    }).then(function (data) {
        var html = ''
        $.each(data, function (index, value) {
            html += `<option value=${value.id}>${value.nome}</option>`
        })
        document.getElementById('setor').innerHTML = html
    })
})

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()
    var nome = document.getElementById('nome').value.trim()
    var email = document.getElementById('e-mail').value.trim()
    var senha = document.getElementById('senha').value
    var tipo = document.getElementById('tipo').value
    var setor = {
        id: document.getElementById('setor').value
    }

    if (nome == '' || email == '' || senha == '') {
        document.getElementById('resposta').innerHTML = '<strong style="color: red;">Preenchar todos os campos</strong>'
        return
    }

    if (!validacaoEmail(email)) {
        document.getElementById('resposta').innerHTML = '<strong style="color: red;">O e-mail é inválido</strong>'
        return
    }

        $.ajax({
            type: 'post',
            url: 'https://softrec.com.br/usuario/',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                tipo: tipo,
                setor: setor
            }),
            dataType: 'json'
        }).then(function (data) {
            document.getElementById('resposta').innerHTML = '<strong style="color: green;">Cadastro realizado com sucesso!</strong>'
            document.getElementById('nome').value = ''
            document.getElementById('e-mail').value = ''
            document.getElementById('senha').value = ''
        }).always(function (jXHR) {
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

