var paginate = {

    create: function(parametros) {

        let href = parametros.url;
        let paginas = parseInt(parametros.paginas, 10)
        let atual = parseInt(parametros.atual, 10)
        let search = parametros.search
        let params = ""
        let html = ""

        //parametros
        if (search)
            search.forEach((name) => {
                let valueName = $(`#${name}`).val()
                if (valueName) params += "&" + name + "=" + valueName
            })

        //primeiro e anterior
        if (atual > 0) {
            let anterior = href + "?pagina=" + (atual - 1) + params
            let primeira = href + "?pagina=0" + params
            html += "<li class='page-item'><a class='page-link' href=\"" + primeira + "\">Primeira</a></li>"
            html += "<li><a class='page-link' href=\"" + anterior + "\">Anterior</a></li>"
        }

        //limite
        if (atual < 9) {
            inicio = 0;
            fim = 10;
        } else {
            inicio = atual - 4;
            fim = atual + 4;
        }

        //numeracao
        for (var i = 0; i < paginas; i++) {

            if (i !== atual) {
                if ((i >= inicio) && (i <= fim)) {
                    url = href + "?pagina=" + i + params;
                    html += " <li class='page-item'><a class='page-link' href=\"" + url + "\">" + (i + 1) + "</a></li> ";
                }
            } else {
                html += " <li class=\"page-item active\"><a class='page-link' href=\"javascript:void(0);\">" + (i + 1) + "</a></li>";
            }
        }

        //proxima e ultima
        if (atual < paginas - 1) {
            let proxima = href + "?pagina=" + (atual + 1) + params;
            let ultima = href + "?pagina=" + (paginas - 1) + params;
            html += " <li class='page-item'><a class='page-link' href=\"" + proxima + "\">Pr&oacute;xima</a></li><li class='page-item' ><a class='page-link' href=\"" + ultima + "\">&Uacute;ltima</a></li>";
        }

        $("ul#pagination").html(html);
    }

};