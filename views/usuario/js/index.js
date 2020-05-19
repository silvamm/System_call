$(function() {
    document
        .getElementById('add')
        .addEventListener('click', function() {
            window.location = '/usuario'
        })

})

function excluir(item, id) {
    if (confirm("Deseja realmente excluir o registro ? ")) {
        $.ajax({
            type: 'delete',
            url: '/usuario/' + id
        }).done(function() {
            let tr = $(item).closest('tr')
            tr.fadeOut(500, () => tr.remove())
        }).fail(function(jXHR) {
            console.log('aconteceu um erro')
        })
    }
}

function editar(id) {
    window.location = '/usuario/' + Number(id)
}