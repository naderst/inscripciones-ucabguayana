/*  Sistema de prematrícula - UCAB Guayana
    Aplicación: Autenticación
    Aplicación URL: http://github.com/naderst/inscripciones-ucabguayana
    Autores: https://github.com/naderst/inscripciones-ucabguayana/graphs/contributors
    Version: 1.0
        Requiere jQuery 1.9.1
*/
var usuarioModificado = false;
var claveModificada = false;

function iniciarSesion() {
    $.ajax({
        url: basedir + '/json/login.php',
        type: 'POST',
        data: {
            'usuario': $('input[type=text]').val(),
            'clave': $('input[type=password]').val()
        },
        error: function () {
            alert('Ocurrió un error iniciando sesión.');
        },
        success: function (json) {
            var respuesta = (JSON.parse(json));
            if (respuesta.flag == '0')
                alert(respuesta.msg);
            else
                window.location = basedir + respuesta.msg;
        }
    });
}

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

    $('#iniciar-sesion').click(function () {
        iniciarSesion();
    });
});