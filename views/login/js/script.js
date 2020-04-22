document.getElementById('form').addEventListener('submit', function (e) {

    
    e.preventDefault()
     window.location = '/principal'
    // $.ajax({
    //     type: 'post',
    //     contentType: 'application/json',
    //     url: "https://softrec.com.br/login/",
    //     data: JSON.stringify({
    //         email: document.getElementById('login').value,
    //         senha: document.getElementById('password').value
    //     }),
    //     dataType: 'json',
    // }).then(function (data) {
    //     document.getElementById('resposta').innerHTML = ''
    //     window.location = '/principal'
    // }).always(function (jXHR) {
    //     if (jXHR != undefined) {
    //         if (jXHR.status = 404) {
    //             document.getElementById('resposta').innerHTML = '<strong style="color:red;">E-mail ou senha incorretos</strong>'
    //         }
    //     }
    // });
})