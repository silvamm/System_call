let form = document.getElementById('form')
let resposta = document.getElementById('resposta')
let btn = document.getElementById('btnSubmit')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let email = document.getElementById('login').value.trim(),
        senha = document.getElementById('password').value.trim()

    if (email.length == 0 || senha.length == 0) {
        return resposta.innerHTML = '<strong style="color:red;">Informe e-mail e senha</strong>'
    }

    resposta.innerHTML = '<strong style="color:green;">Iniciando autenticação ... </strong>'
    btn.disabled = true

    $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: "/login/",
        data: JSON.stringify({
                email: email,
                senha: senha
            })
            // dataType: 'json',
    }).done(function() {
        resposta.innerHTML = ''
        window.location = '/principal'
    }).fail(function(jXHR) {
        console.log(jXHR)
        if (jXHR != undefined) {
            if (jXHR.status = 404) {
                resposta.innerHTML = '<strong style="color:red;">E-mail ou senha incorretos</strong>'
            }
        }
    }).always(() => btn.disabled = false);
})