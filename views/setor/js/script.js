$(function() {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault()
        var nome = document.getElementById('nome').value.trim()

        if (nome == '') {
            document.getElementById('resposta').innerHTML = '<strong style="color: red;">Preencha todos os campos</strong>'
            return
        }

        $.ajax({
            type: 'post',
            url: '/setor/',
            contentType: 'application/json',
            data: JSON.stringify({
                nome: nome
            })
        }).done(function() {
            document.getElementById('resposta').innerHTML = '<strong style="color: green;">Cadastro realizado com sucesso!</strong>'
            document.getElementById('nome').value = ''
            setTimeout(() => document.getElementById('resposta').innerHTML = '', 3000);
        }).fail(function(jXHR) {
            document.getElementById('resposta').innerHTML = '<strong style="color: red;">Falha ao se comunicar com o servidor</strong>'
        })

    })

})