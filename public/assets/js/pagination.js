var paginate = {
    create: function(parametros) {

        var self = parametros.url;

        var HTML = "";
        var paginas = parseInt(parametros.paginas, 10);
        var atual = parseInt(parametros.atual, 10);
        console.log(paginas)
        console.log(atual)
        var params = "";
        if (atual > 1) {
            var menos = atual - 1;
            var url = self + "?pagina=" + menos + params;
            var url1 = self + "?pagina=1" + params;
            HTML += "<li class='page-item'><a class='page-link' href=\"" + url1 + "\">Primeira</a></li><li class='page-item' ><a class='page-link' href=\"" + url + "\">Anterior</a></li>";
        }
        if (atual < 9) {
            ini = 1;
            fim = 10;
        } else {
            ini = atual - 4;
            fim = atual + 4;
        }
        for (var i = 1; i <= paginas; i++) {

            if (i !== atual) {
                if ((i >= ini) && (i <= fim)) {
                    url = self + "?pagina=" + i + params;
                    HTML += " <li class='page-item'><a class='page-link' href=\"" + url + "\">" + i + "</a></li> ";
                }

            } else {
                HTML += " <li class=\"page-item active\"><a class='page-link' href=\"javascript:void(0);\">" + i + "</a></li>";
            }
        }
        if (atual < paginas) {
            mais = atual + 1;
            url = self + "?page=" + mais + params;
            url2 = self + "?page=" + paginas + params;
            HTML += " <li class='page-item'><a class='page-link' href=\"" + url + "\">Pr&oacute;xima</a></li><li><a class='page-link' href=\"" + url2 + "\">&Uacute;ltima</a></li>";
        }

        $("ul#pagination").html(HTML);
    }
};