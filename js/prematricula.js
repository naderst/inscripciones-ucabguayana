/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Ingreso de prematrícula
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
var materiasSeleccionadas = [];
var prematriculaBase;
var creditosSeleccionados = 0;
var creditosMaximos = 0;
var preloadHTML = '<div class="preload"><div></div><div></div><div></div><div></div></div>';

function cargarPrematriculaBase() {
    $.ajax({
        url: basedir + '/json/prematricula.php',
        beforeSend: function () {},
        complete: function () {},
        error: function () {
            alert('No se pudo cargar la prematrícula base.');
        },
        success: function (json) {
            inflarPrematricula(JSON.parse(json));
        }
    });
}

function inflarPrematricula(prematricula) {
    var html = '';

    for (i = 0; i < prematricula.materias.length; ++i) {
        html += '<li><a data-codigo="' + prematricula.materias[i].codigo + '" data-creditos="' + prematricula.materias[i].creditos +
            '" href="javascript:void(0)">' + prematricula.materias[i].nombre + '<i class="fa fa-circle-o"></i></a></li>';
    }

    $('#prematricula').html(html);
    $('#lapso').html(prematricula.lapso);
    creditosMaximos = parseInt(prematricula.creditos);
    prematriculaBase = prematricula.materias;
}

function cargarFuturosSemestres() {
    $.ajax({
        url: basedir + '/json/futuros_semestres.php',
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

function actualizarCreditos() {
    $('#creditos').html('<i class="fa fa-bookmark-o"></i>Créditos a cursar: ' + creditosSeleccionados);


    for (i = 0; i < prematriculaBase.length; ++i) {
        if ($.inArray(prematriculaBase[i].codigo, materiasSeleccionadas) == -1 &&
            (creditosSeleccionados + parseInt(prematriculaBase[i].creditos) > creditosMaximos)) {
            $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').addClass('disabled');
        } else {
            $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').removeClass('disabled');
        }
    }
}

function materiaSeleccionada(materia) {
    if (materia.children('i').hasClass('fa-circle-o')) {
        materia.children('i').removeClass('fa-circle-o');
        materia.children('i').addClass('fa-check-circle-o');
        materiasSeleccionadas.push(materia.attr('data-codigo'));
        creditosSeleccionados += parseInt(materia.attr('data-creditos'));
    } else {
        materia.children('i').removeClass('fa-check-circle-o');
        materia.children('i').addClass('fa-circle-o');
        materiasSeleccionadas.splice(materiasSeleccionadas.indexOf(materia.attr('data-codigo')), 1);
        creditosSeleccionados -= parseInt(materia.attr('data-creditos'));
    }
    actualizarCreditos();
}

function enviarPrematricula() {
    var respuesta = confirm('Confirme las materias seleccionadas. Esta acción no se puede deshacer.');

    if (respuesta == true) {
        $.ajax({
            type: "POST",
            data: materiasSeleccionadas,
            url: basedir + '/json/inscribir_prematricula.php',
            success: function (msg) {
                alert('Su prematrícula ha sido ingresada con éxito ');
            }
        });
    }
}

$(document).ready(function () {
    cargarPrematriculaBase();

    $(document).on('click', '#prematricula li a:not(.disabled)', function () {
        materiaSeleccionada($(this));
        cargarFuturosSemestres();
    });

    $('#enviar-prematricula').click(function () {
        enviarPrematricula();
    });
});