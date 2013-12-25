/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Ingreso de prematrícula
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
$(document).ready(function () {
    "use strict";
    $('#prematricula li a').click(function () {
        if ($(this).children('i').hasClass('fa-circle-o')) {
            $(this).children('i').removeClass('fa-circle-o');
            $(this).children('i').addClass('fa-check-circle-o');
        } else {
            $(this).children('i').removeClass('fa-check-circle-o');
            $(this).children('i').addClass('fa-circle-o');
        }
    });

});