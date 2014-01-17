//Información que se solicita a la base de datos simpre que carga la página
function cargarDatos() {
    $.ajax({
        async: false,
        url: basedir + '/json/onload_directivo.php',
        error: function () {
            $('#status').html('Error cargando información inicial de la base de datos').show();
        },
        success: function (json) {
            var data_inicial = JSON.parse(json);
            var html = '';

            for (var i in data_inicial.profesor)
                html += '<option value="' + data_inicial.profesor[i].cedula + '">' + data_inicial.profesor[i].nombre + ' ' + data_inicial.profesor[i].apellido + '</option>';

            $('.profesor').append(html);
            html = '';

            for (var i in data_inicial.periodo)
                html += '<option value="' + data_inicial.periodo[i] + '">' + data_inicial.periodo[i] + '</option>';

            $('.periodo').append(html);
            html = '';

            for (var i in data_inicial.materia)
                html += '<option value="' + data_inicial.materia[i].codigo + '">' + data_inicial.materia[i].nombre + '</option>';

            $('.materia').append(html);
            html = '';
        }
    });
}

function mostrarEstudiantes(estudiantes) {
    if (estudiantes.length > 0) {
        var abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var info = '<p><button id="desmarcar" type="button"><i class="fa fa-check"></i>Desmarcar todo</button><i class="fa fa-info"></i>Haga click sobre una fila para remarcar y presione nuevamente para desmarcar</p>';
        var lista_letras = '<select class="lista" id="combo-letras">';
        var barra_letras = '<tr>';
        var html = '<thead><tr><th>Apellido</th><th>Nombre</th><th>Cédula</th></tr></thead><tbody>';

        if ($('.resultados').is(':checked'))
            for (var i in abc) {
                barra_letras += '<td><a href="#' + abc[i] + '">' + abc[i] + '</a></td>';
                lista_letras += '<option value="' + abc[i] + '">' + abc[i] + '</option>';
                html += '<tr style="border-bottom: 2px solid #FFD100"><td id="' + abc[i] + '" colspan="3">' + abc[i] + '</td></tr>'
                var j;
                for (j = 0; j < estudiantes.length && abc[i] == estudiantes[j].apellido.charAt(0); j++)
                    html += '<tr><td>' + estudiantes[j].apellido + '</td><td>' + estudiantes[j].nombre + '</td><td>' + estudiantes[j].cedula + '</td></tr>';
                if (j == 0)
                    html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';
            } else {
                barra_letras += '<td id="A" style="color: #12B6EB">A</td>';
                lista_letras += '<option value="A">A</option>';
                var i;
                for (i = 1; i < abc.length; i++) {
                    barra_letras += '<td id="' + abc[i] + '">' + abc[i] + '</td>';
                    lista_letras += '<option value="' + abc[i] + '">' + abc[i] + '</option>';
                }
                for (i = 0; i < estudiantes.length && abc[0] == estudiantes[i].apellido.charAt(0); i++)
                    html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';
                if (i == 0)
                    html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';
            }

        lista_letras += '</select>';
        barra_letras += '</tr>';
        html += '</tbody>';

        $('.informacion').html(info).show();
        $('.letras').html(barra_letras).show();
        $('.lista-letras').html(lista_letras).show();
        $('.estudiantes').html(html).show();
    } else
        $('.informacion').html('<p align="center">No se encontraron resultados</p>').show();
}

function barraLetras(letra) {
    $.ajax({
        async: false,
        url: basedir + '/json/consulta_directivo.php',
        type: 'POST',
        data: {
            profesor: $('.profesor').val() != '' ? $('.profesor').val() : '',
            periodo: $('.periodo').val() != '' ? $('.periodo').val() : '',
            asignatura: $('.materia').val() != '' ? $('.materia').val() : '',
            creditos: $('.creditos').val() != '' ? $('.creditos').val() : '',
            flag: $('.creditos').val() != '' ? $('.flag').val() : '',
            letra: letra.toLowerCase()
        },
        error: function () {
            $('#status').html('Disculpe, no se pudo realizar su consulta, por favor intente nuevamente').show();
        },
        success: function (json) {
            var estudiantes = JSON.parse(json);
            var html = '<thead><tr><th>Apellido</th><th>Nombre</th><th>Cédula</th></tr></thead><tbody>';
            var i;

            $('#' + letra).css('color', '#12B6EB');

            $('.letras td').each(function () {
                if ($(this).css('color') != '#000' && $(this).attr('id') != letra)
                    $(this).css('color', '#000');
            });

            for (i = 0; i < estudiantes.length; i++)
                html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';
            if (i == 0)
                html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';

            html += '</tbody>';

            $('.estudiantes').html(html).show();
        }
    });
}

function comboboxLetras(letra) {
    $.ajax({
        async: false,
        url: basedir + '/json/consulta_directivo.php',
        type: 'POST',
        data: {
            profesor: $('.profesor').val() != '' ? $('.profesor').val() : '',
            periodo: $('.periodo').val() != '' ? $('.periodo').val() : '',
            asignatura: $('.materia').val() != '' ? $('.materia').val() : '',
            creditos: $('.creditos').val() != '' ? $('.creditos').val() : '',
            flag: $('.creditos').val() != '' ? $('.flag').val() : '',
            letra: letra.toLowerCase()
        },
        error: function () {
            $('#status').html('Disculpe, no se pudo realizar su consulta, por favor intente nuevamente').show();
        },
        success: function (json) {
            var estudiantes = JSON.parse(json);
            var html = '<thead><tr><th>Apellido</th><th>Nombre</th><th>Cédula</th></tr></thead><tbody>';
            var i;

            for (i = 0; i < estudiantes.length; i++)
                html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';
            if (i == 0)
                html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';

            html += '</tbody>';

            $('.estudiantes').html(html).show();
        }
    });
}

$(document).ready(function () {
    $('.informacion').hide();
    $('.letras').hide();
    $('.lista-letras').hide();
    $('.estudiantes').hide();
    $('#status').hide();

    cargarDatos();

    //Consulta del usuario a la base de datos
    $(document).on('click', '.buscar', function () {
        $('.informacion').hide();
        $('.letras').hide();
        $('.lista-letras').hide();
        $('.estudiantes').hide();
        $('#status').hide();
        $.ajax({
            async: false,
            url: basedir + '/json/consulta_directivo.php',
            type: 'POST',
            data: {
                profesor: $('.profesor').val() != '' ? $('.profesor').val() : '',
                periodo: $('.periodo').val() != '' ? $('.periodo').val() : '',
                asignatura: $('.materia').val() != '' ? $('.materia').val() : '',
                creditos: $('.creditos').val() != '' ? $('.creditos').val() : '',
                flag: $('.creditos').val() != '' ? $('.flag').val() : '',
                letra: ''
            },
            error: function () {
                $('#status').html('Disculpe, no se pudo realizar su consulta, por favor intente nuevamente').show();
            },
            success: function (json) {
                mostrarEstudiantes(JSON.parse(json));
            }
        });
    });

    //Validación del campo de créditos acumulados para que sea sólo numérico
    $(document).on('keypress', '.creditos', function (evento) {
        var key;
        
        if (window.event) // IE
            key = evento.keyCode;
        else if (evento.which) // Netscape/Firefox/Opera
            key = evento.which;
        if (key < 48 || key > 57)
            return false;
        
        return true;
    });

    //Marca o desmarcar filas de la tabla
    $(document).on('click', '.estudiantes td', function (e) {
        if ($(e.target).closest('tr').children('td').not('td[colspan=3]').css('background-color') == 'rgba(0, 0, 0, 0)')
            $(e.target).closest('tr').children('td').not('td[colspan=3]').css('background-color', 'rgba(18, 182, 235, 0.2)');
        else
            $(e.target).closest('tr').children('td').not('td[colspan=3]').css('background-color', 'rgba(0,0,0,0)');
    });

    //Desmarcar todo
    $(document).on('click', '#desmarcar', function () {
        $('.estudiantes td').each(function () {
            if ($(this).css('background-color') != 'rgba(0, 0, 0, 0)')
                $(this).css('background-color', 'rgba(0, 0, 0, 0)');
        });
    });

    //Habilitar o deshabilitar condición de los créditos
    $(document).on('change', '.creditos', function () {
        if ($('.creditos').val() != '')
            $('.flag').prop('disabled', false);
        else
            $('.flag').prop('disabled', 'disabled');
    });

    //Habilitar condición de créditos
    $(document).on('change', '#general .creditos', function () {
        if ($('#general .creditos').val() != '')
            $('.flag').prop('disabled', false);
        else
            $('.flag').prop('disabled', 'disabled');
    });

    //Buscar resultados por letra con la barra de letras
    $(document).on('click', '.letras td', function () {
        if (!$('.resultados').is(':checked')) {
            $('.estudiantes').hide();
            barraLetras($(this).attr('id'));
        }
    });

    //Buscar resultados por letra con el combobox de letras
    $(document).on('change', '.lista-letras #combo-letras', function () {
        if (!$('.resultados').is(':checked')) {
            $('.estudiantes').hide();
            comboboxLetras($(this).val());
        } else {
            $('html, body').animate({
                scrollTop: $('#' + letra).offset().top
            }, 1000);
        }
    });
});