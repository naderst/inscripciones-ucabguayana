$(document).ready(function () {
    $('.prematricula').hide();
    $('#status').hide();
    $.ajax({
        async: false,
        url: basedir + '/json/prematricula_fija.php',
        error: function () {
            $('#status').html('No se pudo mostrar su prematricula').show();
        },
        success: function (json) {
            var prematricula = JSON.parse(json);
            var colores = ['materia1','materia2','materia3','materia4','materia5','materia6','materia7','materia8','materia9','materia10'];
            var html = '';
            
            html += '<tr><td><h2>Lapso: ' + prematricula.lapso + '</h2></td></tr><tr><td><h2>Creditos en curso: ' + prematricula.creditos_curso + '</h2></td></tr><tr><td><h2>Creditos restantes: ' + prematricula.creditos_restantes + '</h2></td></tr><tr><td><h2>Materias a cursar:</h2/></td></tr><tr><td>&nbsp;</td></tr>';
            
            for (var i in prematricula.materias)
                html += '<tr><td><div id="' + colores[i] + '">' + prematricula.materias[i] + '</div></td></tr>';
            
            $('.prematricula').append(html);
            $('.prematricula').show();
        }
    });
});