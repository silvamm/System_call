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
    form.submit()

})