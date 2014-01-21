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

    cargarHorario(colores);

    $('.prematricula').show();
    $('.prematricula').after('<p class="info"><i class="fa fa-info"></i>Estás cursando ' +
        prematricula.creditos_curso + ' créditos y te faltan ' + prematricula.creditos_restantes + ' créditos para graduarte.');
    $('#lapso').html(prematricula.lapso);
}

function cargarHorario(colores) {
    $.ajax({
        async: false,
        url: basedir + '/json/horario.php',
        error: function () {
            $('#status').html('No se pudo mostrar datos de horario en las materias');
        },
        success: function (json) {
            var horario = JSON.parse(json);
            var html = '';
            
            for (var i in horario) {
                html += '<li id="' + colores[i] + '">' + horario[i].materia + '<br><span>Profesor: ' + horario[i].profesor + '<br>';
                for (var j in horario[i].dias) {
                    k = horario[i].dias.length - j - 1;
                    html += horario[i].dias[k].dia + ' ' + horario[i].dias[k].hora_inicio + ' - ' + horario[i].dias[k].hora_fin + '<br> Salón: ' + horario[i].dias[k].salon + '<br>';
                }
                html += '</span></li>';
            }
            $('.prematricula').append(html);
        }
    });
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
            html += '<li><span class="creditos">' + semestres[i].materias[j].creditos + ' UC</span>' + semestres[i].materias[j].nombre + '</li>';
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
    
    $('.prematricula li').click(function () {
        $(this).find('span').slideToggle();
    });
});