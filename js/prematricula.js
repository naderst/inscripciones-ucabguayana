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
    var htmlDesplazadas = '';
    var htmlEspeciales = '';

    for (i = 0; i < prematricula.materias.length; ++i) {
        switch (parseInt(prematricula.materias[i].flag)) {
        case 0:
            html += '<li><a data-codigo="' + prematricula.materias[i].codigo + '" data-creditos="' + prematricula.materias[i].creditos +
                '" href="javascript:void(0)">' + prematricula.materias[i].nombre + '<i class="fa fa-circle-o"></i></a></li>';
            break;
        case -1:
            htmlEspeciales += '<p class="info"><i class="fa fa-info"></i>Ya puedes inscribir ' + prematricula.materias[i].nombre +
                ', por favor dirígete a la escuela y pregunta por el profesor encargado de la materia.</p>';
            break;
        default:
            htmlDesplazadas += '<li><a class="disabled" data-codigo="' + prematricula.materias[i].codigo + '" data-creditos="' +
                prematricula.materias[i].creditos + '" href="javascript:void(0)">' + prematricula.materias[i].nombre + '<i class="fa fa-circle-o"></i></a></li>';
            break;
        }
    }

    $('#prematricula').html(html + htmlDesplazadas);
    $('#materias-especiales').html(htmlEspeciales);
    $('#lapso').html(prematricula.lapso);
    creditosMaximos = parseInt(prematricula.creditos);
    prematriculaBase = prematricula.materias;
}

function cargarFuturosSemestres() {
    $.ajax({
        url: basedir + '/json/ruta_futura.php',
        type: 'POST',
        data: {
            'materias': materiasSeleccionadas
        },
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
    /* Se habilitan las materias de semestres superiores que se pueden inscribir.
     ** Se deshabilitan las materias de semestres superiores que no se pueden inscribir porque hay materias de semestres inferiores pendientes.
     */
    for (i = 0; i < prematriculaBase.length; ++i) {
        var desplazamiento = 0;
        var habilitar = true;

        if (parseInt(prematriculaBase[i].flag) > 0) {
            desplazamiento = parseInt(prematriculaBase[i].flag);

            for (j = 0; j < prematriculaBase.length; ++j) {
                if (parseInt(prematriculaBase[j].flag) > -1 && parseInt(prematriculaBase[j].flag) < desplazamiento &&
                    $.inArray(prematriculaBase[j].codigo, materiasSeleccionadas) == -1) {
                    habilitar = false;
                }
            }
            if (habilitar) {
                $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').removeClass('disabled');
            } else {
                $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').addClass('disabled');
                $('a[data-codigo="' + prematriculaBase[i].codigo + '"] i').removeClass('fa-check-circle-o');
                $('a[data-codigo="' + prematriculaBase[i].codigo + '"] i').addClass('fa-circle-o');
                if (materiasSeleccionadas.indexOf(prematriculaBase[i].codigo) != -1) {
                    materiasSeleccionadas.splice(materiasSeleccionadas.indexOf(prematriculaBase[i].codigo), 1);
                    creditosSeleccionados -= parseInt(prematriculaBase[i].creditos);
                }
            }
        }
    }

    /* Se desabilitan las materias que no se pueden inscribir por límite de créditos.
     ** Se habilitan las materias que ahora se pueden inscribir porque el usuario eliminó la selección de una o varias materias.
     */
    for (i = 0; i < prematriculaBase.length; ++i) {
        if ($.inArray(prematriculaBase[i].codigo, materiasSeleccionadas) == -1 && (creditosSeleccionados + parseInt(prematriculaBase[i].creditos) > creditosMaximos)) {
            $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').addClass('disabled');
        } else if (parseInt(prematriculaBase[i]) == 0) {
            $('a[data-codigo="' + prematriculaBase[i].codigo + '"]').removeClass('disabled');
        }
    }

    $('#creditos').html('<i class="fa fa-bookmark-o"></i>Créditos a cursar: ' + creditosSeleccionados);
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
        if (materiasSeleccionadas.indexOf(materia.attr('data-codigo')) != -1) {
            materiasSeleccionadas.splice(materiasSeleccionadas.indexOf(materia.attr('data-codigo')), 1);
        }
        creditosSeleccionados -= parseInt(materia.attr('data-creditos'));
    }
    actualizarCreditos();
}

function enviarPrematricula() {
    var respuesta = confirm('Confirme las materias seleccionadas. Esta acción no se puede deshacer.');

    if (respuesta == true) {
        $.ajax({
            url: basedir + '/json/inscribir_prematricula.php',
            type: "POST",
            data: {
                'materias': materiasSeleccionadas
            },
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
        if (materiasSeleccionadas.length > 0) {
            cargarFuturosSemestres();
        } else {
            $('#futuros-semestres').html(preloadHTML + '<div class="fix"></div>');
        }
    });

    $('#enviar-prematricula').click(function () {
        enviarPrematricula();
    });
});