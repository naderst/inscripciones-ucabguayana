$(document).ready(function () {
    $('.administrativo').hide();
    $('#status').hide();

    //Información que se solicita a la base de datos simpre que carga la página
    $.ajax({
        async: false,
        url: basedir + '/json/onload_directivo.php',
        error: function () {
            $('#status').html('Error cargando información inicial de la base de datos').show();
        },
        success: function (json) {
            var data_inicial = JSON.parse(json);
            var html = '<tr><td><h3>Profesor</h3></td><td><h3>Período</h3></td><td><h3>Materia</h3></td></tr><tr><td><select class="lista" id="profesor">';

            for (var i in data_inicial.profesor)
                html += '<option value="' + data_inicial.profesor[i].cedula + '">' + data_inicial.profesor[i].nombre + ' ' + data_inicial.profesor[i].apellido + '</option>';

            html += '</select></td><td><select class="lista" id="periodo">';

            for (var i in data_inicial.periodo)
                html += '<option value="' + data_inicial.periodo[i] + '">' + data_inicial.periodo[i] + '</option>';

            html += '</select></td><td><select class="lista" id="materia">';

            for (var i in data_inicial.materia)
                html += '<option value="' + data_inicial.materia[i].codigo + '">' + data_inicial.materia[i].nombre + '</option>';

            html += '</select></td></tr><tr><td><br><h3>Créditos acumulados</h3><input class="lista" id="creditos"></td><td><br><h3>Condición</h3><select class="lista" id="flag"><option value="2">Menor</option><option value="0">Igual</option><option value="1">Mayor</option></select></td></tr><tr><td><button id="buscar"><i class="fa fa-search"></i>Buscar</button></td></tr>';

            $('.administrativo').append(html);
            $('.administrativo').show();
        }
    });

    //Consulta del usuario a la base de datos
    $('#buscar').click(function () {
        $('.estudiantes').hide();
        $.ajax({
            async: false,
            url: basedir + '/json/consulta_directivo.php',
            type: 'POST',
            data: {
                profesor: $('#profesor').val(),
                periodo: $('#periodo').val(),
                asignatura: $('#materia').val(),
                creditos: $('#creditos').val(),
                flag: $('#flag').val()
            },
            error: function () {
                $('#status').html('Disculpe, no se pudo realizar su consulta, por favor intente nuevamente').show();
            },
            success: function (json) {
                var estudiantes = JSON.parse(json);
                var html = '';
                
                for (var i in estudiantes)
                    html += '<tr><td>' + estudiantes[i].apellido + '</td><td>' + estudiantes[i].nombre + '</td><td>' + estudiantes[i].cedula + '</td></tr>';

                $('.estudiantes').append(html);
                $('.estudiantes').show();
            }
        });
    });

});