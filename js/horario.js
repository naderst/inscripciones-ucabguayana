$(document).ready(function () {
    $('.horario').hide();
    $('#status').hide();
    $('#status').html('Cargando...');
    $.ajax({
        url: basedir + '/json/horario.php',
        beforeSend: function () {
            $('#status').show();
        },
        complete: function () {
            $('#status').hide();
        },
        error: function () {
            alert('Ocurrió un error cargando el horario.');
        },
        success: function (json) {
            var colores = ['m1', 'm2', 'm3', 'm4', 'm5'];
            var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            var horas = ['7:00 a.m.', '7:30 a.m.', '8:00 a.m.', '8:30 a.m.', '9:00 a.m.', '9:30 a.m.', '10:00 a.m.', '10:30 a.m.', '11:00 a.m.', '11:30 a.m.', '12:00 p.m.', '12:30 p.m.', '1:00 p.m.', '1:30 p.m.', '2:00 p.m.', '2:30 p.m.', '3:00 p.m.', '3:30 p.m.', '4:00 p.m.', '4:30 p.m.', '5:00 p.m.', '5:30 p.m.', '6:00 p.m.', '6:30 p.m.', '7:00 p.m.', '7:30 p.m.', '8:00 p.m.', '8:30 p.m.', '9:00 p.m.', '9:30 p.m.', '10:00 p.m.', '10:30 p.m.'];
            var horario = new Array(horas.length);

            for (i = 0; i < horario.length; ++i)
                horario[i] = new Array(dias.length);

            var materias = JSON.parse(json);

            for (var i in materias)
                for (var j in materias[i].dias) {
                    var ik = horas.indexOf(materias[i].dias[j].hora_inicio);
                    var jk = dias.indexOf(materias[i].dias[j].dia);
                    var rowspan = horas.indexOf(materias[i].dias[j].hora_fin) - horas.indexOf(materias[i].dias[j].hora_inicio) + 1;

                    horario[ik][jk] = [parseInt(i), rowspan];

                    for (var k = ik + 1; k <= ik + rowspan - 1; ++k)
                        horario[k][jk] = [parseInt(i), -1];
                }

            var html = '';

            for (var i = 0; i < horario.length - 1; ++i) {
                html += '<tr>';
                html += '<td class="hora">' + horas[i].substr(0,5) + '</td>';

                for (var j = 0; j < horario[i].length; ++j) {
                    if (horario[i][j] == undefined)
                        html += '<td>&nbsp;</td>';
                    else if (horario[i][j][1] != -1)
                        html += '<td class="materia ' + colores[horario[i][j][0] % 4] + '" rowspan="' + horario[i][j][1] + '">' + materias[horario[i][j][0]].materia + '<br>(' + materias[horario[i][j][0]].salon + ')</td>';
                }

                html += '</tr>';
            }

            $('.horario').append(html);
            $('.horario').show();
        }
    });
});