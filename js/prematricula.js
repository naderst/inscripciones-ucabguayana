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

$(document).ready(function () {
    $('#prematricula li a').click(function () {
        materiaSeleccionada($(this));
    });
});