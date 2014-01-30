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

//Muestra la tabla con los resultados de la búsqueda de estudiantes
function mostrarEstudiantes(estudiantes) {
    if (estudiantes.length > 0) {
        var abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var info = '<p><button id="desmarcar" type="button"><i class="fa fa-check"></i>Desmarcar todo</button><i class="fa fa-info"></i>Haga click sobre una fila para remarcar y presione nuevamente para desmarcar</p>';
        var lista_letras = '<select class="lista" id="combo-letras">';
        var barra_letras = '<tr>';
        var html = '<thead><tr><th>Apellido</th><th>Nombre</th><th>Cédula</th></tr></thead><tbody>';

        $('#generalSubmit .enviar').removeAttr('disabled');
        $('#escritorioSubmit .enviar').removeAttr('disabled');

        if ($('.administrativo .resultados').is(':checked')) {
            $('#general .checkbox').val(checkbox = true);
            $('#escritorio .checkbox').val(checkbox = true);
            for (var i in abc) {
                barra_letras += '<td><a href="#' + abc[i] + '">' + abc[i] + '</a></td>';
                lista_letras += '<option value="' + abc[i] + '">' + abc[i] + '</option>';
                var j;
                var flag = false;
                var temp = '';

                for (j = 0; j < estudiantes.length; j++){
                    if(abc[i] == estudiantes[j].apellido.charAt(0)){
                        temp += '<tr><td>' + estudiantes[j].apellido + '</td><td>' + estudiantes[j].nombre + '</td><td>' + estudiantes[j].cedula + '</td></tr>';
                        flag = true;
                    }
                }
                if (flag)
                    html += '<tr style="border-bottom: 2px solid #FFD100"><td id="' + abc[i] + '" colspan="3">' + abc[i] + '</td></tr>' + temp;
            }
        } else {
            $('#general .checkbox').val(checkbox = false);
            $('#escritorio .checkbox').val(checkbox = false);
            barra_letras += '<td id="A" style="color: #12B6EB">A</td>';
            lista_letras += '<option value="A">A</option>';
            var i;
            for (i = 1; i < abc.length; i++) {
                barra_letras += '<td id="' + abc[i] + '">' + abc[i] + '</td>';
                lista_letras += '<option value="' + abc[i] + '">' + abc[i] + '</option>';
            }
            for (i = 0; i < estudiantes.length && abc[0] == estudiantes[i].apellido.charAt(0); i++)
                html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';
            if (i == 0) {
                html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';
                $('#generalSubmit .enviar').attr('disabled', 'disabled');
                $('#escritorioSubmit .enviar').attr('disabled', 'disabled');
            } else {
                $('#generalSubmit .enviar').removeAttr('disabled');
                $('#escritorioSubmit .enviar').removeAttr('disabled');
            }
        }

        lista_letras += '</select>';
        barra_letras += '</tr>';
        html += '</tbody>';

        $('.informacion').html(info).show();
        $('.letras').html(barra_letras).show();
        $('.lista-letras').html(lista_letras).show();
        $('.estudiantes').html(html).show();
    } else {
        $('#generalSubmit .enviar').attr('disabled', 'disabled');
        $('#escritorioSubmit .enviar').attr('disabled', 'disabled');
        $('.letras').html('').hide();
        $('.lista-letras').html('').hide();
        $('.estudiantes').html('').hide();
        $('.informacion').html('<p align="center">No se encontraron resultados</p>').show();
    }
}

//Consulta y muestra información de los estudiantes cuyo apellido empiece por la letra marcada en la barra de letras
function barraLetras(letra) {
    $.ajax({
        async: false,
        url: basedir + '/json/consulta_directivo.php',
        type: 'POST',
        data: {
            profesor: $('.administrativo .profesor').val() != '' ? $('.administrativo .profesor').val() : '',
            periodo: $('.administrativo .periodo').val() != '' ? $('.administrativo .periodo').val() : '',
            asignatura: $('.administrativo .materia').val() != '' ? $('.administrativo .materia').val() : '',
            semestre: $('.administrativo .semestre').val() != '' ? $('.administrativo .semestre').val() : '',
            creditos: $('.administrativo .creditos').val() != '' ? $('.administrativo .creditos').val() : '',
            flag: $('.administrativo .creditos').val() != '' ? $('.administrativo .flag').val() : '',
            letra: letra.toLowerCase()
        },
        error: function () {
            $('#status').html('Disculpe, no se pudo realizar su consulta, por favor intente nuevamente').show();
        },
        success: function (json) {
             
            var estudiantes = JSON.parse(json);
            var html = '<thead><tr><th>Apellido</th><th>Nombre</th><th>Cédula</th></tr></thead><tbody>';
            var i;

            marcarLetra(letra);

            for (i = 0; i < estudiantes.length; i++)
                html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';
            if (i == 0) {
                html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';
                $('#generalSubmit .enviar').attr('disabled', 'disabled');
                $('#escritorioSubmit .enviar').attr('disabled', 'disabled');
            } else {
                $('#generalSubmit .enviar').removeAttr('disabled');
                $('#escritorioSubmit .enviar').removeAttr('disabled');
            }

            html += '</tbody>';

            $('.estudiantes').html(html).show();
        }
    });
}

function marcarLetra(letter) {
    $('#' + letter).css('color', '#12B6EB');

    $('.letras td').each(function () {
        if ($(this).css('color') != '#000' && $(this).attr('id') != letter)
            $(this).css('color', '#000');
    });
}

//Consulta y muestra información de los estudiantes cuyo apellido empiece por la letra seleccionada en el combobox de letras
function comboboxLetras(letra) {
    $.ajax({
        async: false,
        url: basedir + '/json/consulta_directivo.php',
        type: 'POST',
        data: {
            profesor: $('.administrativo .profesor').val() != '' ? $('.administrativo .profesor').val() : '',
            periodo: $('.administrativo .periodo').val() != '' ? $('.administrativo .periodo').val() : '',
            asignatura: $('.administrativo .materia').val() != '' ? $('.administrativo .materia').val() : '',
            semestre: $('.administrativo .semestre').val() != '' ? $('.administrativo .semestre').val() : '',
            creditos: $('.administrativo .creditos').val() != '' ? $('.administrativo .creditos').val() : '',
            flag: $('.administrativo .creditos').val() != '' ? $('.administrativo .flag').val() : '',
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
            if (i == 0) {
                html += '<tr><td colspan="3" style="border-bottom: none">No se encontraron resultados en esta letra</td></tr>';
                $('#generalSubmit .enviar').attr('disabled', 'disabled');
                $('#escritorioSubmit .enviar').attr('disabled', 'disabled');
            } else {
                $('#generalSubmit .enviar').removeAttr('disabled');
                $('#escritorioSubmit .enviar').removeAttr('disabled');
            }

            html += '</tbody>';

            $('.estudiantes').html(html).show();
        }
    });
}

var checkbox;

$(document).ready(function () {
    $('.informacion').hide();
    $('.letras').hide();
    $('.lista-letras').hide();
    $('.estudiantes').hide();
    $('#status').hide();
    var flag = window.innerWidth >= 785 ? false : true;
    var flagLetra = window.innerWidth >= 904 ? false : true;
    var letter = 'A';

    cargarDatos();

    //Consulta del usuario a la base de datos sobre estudiantes que cumplan ciertos parámetros o en dado caso de no marcar parámetros se muestran toda la lista de estudiantes almacenados
    $(document).on('click', '.administrativo .buscar', function () {
        $('.informacion').hide();
        $('.letras').hide();
        $('.lista-letras').hide();
        $('.estudiantes').hide();
        $('#status').hide();
        letter = 'A';
        $.ajax({
            async: false,
            url: basedir + '/json/consulta_directivo.php',
            type: 'POST',
            data: {
                profesor: $('.administrativo .profesor').val() != '' ? $('.administrativo .profesor').val() : '',
                periodo: $('.administrativo .periodo').val() != '' ? $('.administrativo .periodo').val() : '',
                asignatura: $('.administrativo .materia').val() != '' ? $('.administrativo .materia').val() : '',
                semestre: $('.administrativo .semestre').val() != '' ? $('.administrativo .semestre').val() : '',
                creditos: $('.administrativo .creditos').val() != '' ? $('.administrativo .creditos').val() : '',
                flag: $('.administrativo .creditos').val() != '' ? $('.administrativo .flag').val() : '',
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

    //Verificación del tamaño de la ventana para esconder o no el diseño de la pág. de acuerdo a los media query (estilo responsive)
    $(window).resize(function () {
        if (window.innerWidth >= 785) {
            $('#general').removeClass();
            $('#escritorio').addClass('administrativo');
            if (flag) {
                $('#escritorio .profesor').val($('#general .profesor').val());
                $('#escritorio .periodo').val($('#general .periodo').val());
                $('#escritorio .materia').val($('#general .materia').val());
                $('#escritorio .semestre').val($('#general .semestre').val());
                $('#escritorio .creditos').val($('#general .creditos').val());
                $('#escritorio .flag').val($('#general .flag').val());
                if ($('#general .resultados').is(':checked'))
                    $('#escritorio .resultados').attr('checked', true);
                else
                    $('#escritorio .resultados').attr('checked', false);
                flag = false;
            }
        } else {
            if (!flag) {
                $('#escritorio').removeClass();
                $('#general').addClass('administrativo');
                $('#general .profesor').val($('#escritorio .profesor').val());
                $('#general .periodo').val($('#escritorio .periodo').val());
                $('#general .materia').val($('#escritorio .materia').val());
                $('#general .semestre').val($('#escritorio .semestre').val());
                $('#general .creditos').val($('#escritorio .creditos').val());
                $('#general .flag').val($('#escritorio .flag').val());
                if ($('#escritorio .resultados').is(':checked'))
                    $('#general .resultados').attr('checked', true);
                else
                    $('#general .resultados').attr('checked', false);
                flag = true;
            }
        }

        if (window.innerWidth >= 904) {
            if (flagLetra) {
                if (!checkbox)
                    marcarLetra($('.lista-letras #combo-letras').val());
                flagLetra = false;
            }
        } else {
            if (!flagLetra) {
                if (!checkbox) {
                    $('.lista-letras #combo-letras').val(letter);
                }
                flagLetra = true;
            }
        }
    });

    //Validación del campo de créditos acumulados para que sea sólo numérico
    $(document).on('keypress', '.administrativo .creditos', function (evento) {
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
    $(document).on('change', '.administrativo .creditos', function () {
        if ($('.administrativo .creditos').val() != '')
            $('.administrativo .flag').prop('disabled', false);
        else
            $('.administrativo .flag').prop('disabled', 'disabled');
    });

    //Buscar resultados por letra con la barra de letras
    $(document).on('click', '.letras td', function () {
        if (!checkbox) {
            $('.estudiantes').hide();
            $('#general .letter').val(letter = $(this).attr('id'));
            $('#escritorio .letter').val(letter = $(this).attr('id'));
            barraLetras(letter);
        } else {
            var flag = false;
            letter = $(this).val();

            $('.estudiantes td[colspan=3]').each(function () {
                if ($(this).attr('id') == letter)
                    flag = true;
            });
            if (flag)
                $('html, body').animate({
                    scrollTop: $('#' + letter).offset().top
                }, 1000);
        }
    });

    //Buscar resultados por letra con el combobox de letras
    $(document).on('change', '.lista-letras #combo-letras', function () {
        if (!checkbox) {
            $('.estudiantes').hide();
            $('#general .letter').val(letter = $(this).val());
            $('#escritorio .letter').val(letter = $(this).val());
            comboboxLetras(letter);
        } else {
            var flag = false;
            letter = $(this).val();

            $('.estudiantes td[colspan=3]').each(function () {
                if ($(this).attr('id') == letter)
                    flag = true;
            });
            if (flag)
                $('html, body').animate({
                    scrollTop: $('#' + letter).offset().top
                }, 1000);
        }
    });
});