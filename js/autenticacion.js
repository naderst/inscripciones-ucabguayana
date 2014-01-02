/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Autenticación
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
var usuarioModificado = false;
var claveModificada = false;

$(document).ready(function () {
    $('input[type=text]').focusin(function () {
        if (!usuarioModificado) {
            $(this).val('');
        }
    });
    $('input[type=password]').focusin(function () {
        if (!claveModificada) {
            $(this).val('');
        }
    });

    $('input[type=text]').change(function () {
        usuarioModificado = true;
    });
    $('input[type=password]').change(function () {
        claveModificada = true;
    });
});