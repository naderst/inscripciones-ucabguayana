/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Ingreso de prematrícula
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
var materiasSeleccionadas = [];

function materiaSeleccionada(materia) {
    if (materia.children('i').hasClass('fa-circle-o')) {
        materia.children('i').removeClass('fa-circle-o');
        materia.children('i').addClass('fa-check-circle-o');
        materiasSeleccionadas.push(materia.attr('data-codigo'));
    } else {
        materia.children('i').removeClass('fa-check-circle-o');
        materia.children('i').addClass('fa-circle-o');
        materiasSeleccionadas.splice(materiasSeleccionadas.indexOf(materia.attr('data-codigo')), 1);
    }
}

function enviarPrematricula() {
    var respuesta = confirm('Confirme las materias seleccionadas. Esta acción no se puede deshacer.');

    if (respuesta == true) {
        $.ajax({
            type: "POST",
            data: {
                materias: materiasSeleccionadas
            },
            url: "index.php",
            success: function (msg) {
                alert('Su prematrícula ha sido ingresada con éxito');
            }
        });
    }
}

$(document).ready(function () {
    $('#prematricula li a').click(function () {
        materiaSeleccionada($(this));
    });

    $('#enviar-prematricula').click(function () {
        enviarPrematricula();
    });
});