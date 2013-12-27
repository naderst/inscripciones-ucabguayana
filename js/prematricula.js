/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Ingreso de prematrícula
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
var materiasSeleccionadas = [];
var creditos = 0;
var preloadHTML = '<div class="preload"><div></div><div></div><div></div><div></div></div>';

function actualizarCreditos() {
    $('#creditos').html('<i class="fa fa-bookmark-o"></i>Créditos a cursar: ' + creditos);
}

function materiaSeleccionada(materia) {
    if (materia.children('i').hasClass('fa-circle-o')) {
        materia.children('i').removeClass('fa-circle-o');
        materia.children('i').addClass('fa-check-circle-o');
        materiasSeleccionadas.push(materia.attr('data-codigo'));
        creditos += parseInt(materia.attr('data-creditos'));
    } else {
        materia.children('i').removeClass('fa-check-circle-o');
        materia.children('i').addClass('fa-circle-o');
        materiasSeleccionadas.splice(materiasSeleccionadas.indexOf(materia.attr('data-codigo')), 1);
        creditos -= parseInt(materia.attr('data-creditos'));
    }
    actualizarCreditos();
}

function cargarFuturosSemestres() {
    $.ajax({
        url: basedir + '/json/futuros-semestres.php',
        beforeSend: function () {
            $('#futuros-semestres .preload').show();
        },
        complete: function () {
            $('#futuros-semestres .preload').hide();
        },
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
    $('#futuros-semestres').html(preloadHTML + html + '<div class="fix"></div>');
}

function enviarPrematricula() {
    var respuesta = confirm('Confirme las materias seleccionadas.Esta acció n no se puede deshacer.');

    if (respuesta == true) {
        $.ajax({
            type: "POST",
            data: {
                materias: materiasSeleccionadas
            },
            url: "index.php",
            success: function (msg) {
                alert('Su prematrícula ha sido ingresada con éxito ');
            }
        });
    }
}

$(document).ready(function () {
    $('#prematricula li a ').click(function () {
        materiaSeleccionada($(this));
        cargarFuturosSemestres();
    });

    $('#enviar-prematricula ').click(function () {
        enviarPrematricula();
    });
});