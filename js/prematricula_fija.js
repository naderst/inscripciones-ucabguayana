function cargarPrematriculaFija() {
    $.ajax({
        async: false,
        url: basedir + '/json/prematricula_fija.php',
        error: function () {
            $('#status').html('No se pudo mostrar su prematrícula').show();
        },
        success: function (json) {
            inflarPrematriculaFija(JSON.parse(json));
        }
    });
}

function inflarPrematriculaFija(prematricula) {
    var colores = ['materia1', 'materia2', 'materia3', 'materia4', 'materia5', 'materia6', 'materia7', 'materia8', 'materia9', 'materia10'];
    var html = '';

    for (var i in prematricula.materias)
        html += '<li id="' + colores[i] + '">' + prematricula.materias[i] + '</li>';

    $('.prematricula').append(html);
    $('.prematricula').show();
    $('.prematricula').after('<p class="info"><i class="fa fa-info"></i>Estás cursando ' +
        prematricula.creditos_curso + ' créditos y te faltan ' + prematricula.creditos_restantes + ' créditos para graduarte.');
    $('#lapso').html(prematricula.lapso);
}

function cargarFuturosSemestres() {
    $.ajax({
        url: basedir + '/json/ruta_futura_fija.php',
        type: 'POST',
        error: function () {
            alert('Ocurrió un error mientras se visualizaba el futuro.');
        },
        success: function (json) {
            inflarFuturosSemestres(JSON.parse(json));
        }
    });
}

function inflarFuturosSemestres(semestres) {
    var html = '';
    for (i = 0; i < semestres.length; ++i) {
        html += '<ul><li>' + semestres[i].lapso + '</li>';
        for (j = 0; j < semestres[i].materias.length; ++j) {
            html += '<li>' + semestres[i].materias[j] + '</li>';
        }
        html += ' <li>Créditos restantes: ' + semestres[i].creditos_restantes + ' </li></ul > ';
    }
    $('#futuros-semestres').html(html + '<div class="fix"></div>');
}

$(document).ready(function () {
    $('.prematricula').hide();
    $('#status').hide();
    cargarPrematriculaFija();
    cargarFuturosSemestres();
});