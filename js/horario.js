$(document).ready(function () {
    $('.horario').hide();
    $('.horario-small table').hide();
    $.ajax({
        async: false,
        url: basedir + '/json/horario.php',
        error: function () {
            $('.contenido .contenedor').html('No se pudo mostrar el horario.');
        },
        success: function (json) {
            var colores = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10'];
            var dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            var horas = ['7:00 a.m.', '7:30 a.m.', '8:00 a.m.', '8:30 a.m.', '9:00 a.m.', '9:30 a.m.', '10:00 a.m.', '10:30 a.m.', '11:00 a.m.', '11:30 a.m.', '12:00 p.m.', '12:30 p.m.', '1:00 p.m.', '1:30 p.m.', '2:00 p.m.', '2:30 p.m.', '3:00 p.m.', '3:30 p.m.', '4:00 p.m.', '4:30 p.m.', '5:00 p.m.', '5:30 p.m.', '6:00 p.m.', '6:30 p.m.', '7:00 p.m.', '7:30 p.m.', '8:00 p.m.', '8:30 p.m.', '9:00 p.m.', '9:30 p.m.', '10:00 p.m.', ''];
            var horario = new Array(horas.length);

            for (i = 0; i < horario.length; ++i)
                horario[i] = new Array(dias.length);

            var materias = JSON.parse(json);

            for (var i in materias)
                for (var j in materias[i].dias) {
                    var ik = horas.indexOf(materias[i].dias[j].hora_inicio);
                    var jk = dias.indexOf(materias[i].dias[j].dia);
                    var rowspan = horas.indexOf(materias[i].dias[j].hora_fin) - horas.indexOf(materias[i].dias[j].hora_inicio) + 1;
                    rowspan--;
                    horario[ik][jk] = [parseInt(i), rowspan];

                    for (var k = ik + 1; k <= ik + rowspan - 1; ++k)
                        horario[k][jk] = [parseInt(i), -1];
                }

            var html = '';

            for (var i = 0; i < horario.length - 2; ++i) {
                html += '<tr>';
                html += '<td class="hora">' + horas[i].substr(0,5) + '-' + horas[i+1].substr(0,5) + '</td>';

                for (var j = 0; j < horario[i].length; ++j) {
                    if (horario[i][j] == undefined)
                        html += '<td>&nbsp;</td>';
                    else if (horario[i][j][1] != -1) {
                        var mdias = materias[horario[i][j][0]].dias;
                        for(var dia in mdias) {
                            if(mdias[dia].dia == dias[j] && mdias[dia].hora_inicio == horas[i])
                                break;
                        }

                        html += '<td class="materia ' + colores[horario[i][j][0] % 10] + '" rowspan="' + horario[i][j][1] + '">' + materias[horario[i][j][0]].materia + '<br>(' + materias[horario[i][j][0]].dias[dia].salon + ')</td>';
                    }
                }

                html += '</tr>';
            }

            $('.horario').append(html);
            $('.horario').show();

            html = '';

            for(j = 0; j < dias.length; ++j) {
                tmphtml = '<tr><th>' + dias[j] + '</th></tr>';
                tmpmaterias = '';

                for(i = 0; i < horario.length - 2; ++i) {
                    if(horario[i][j] != undefined && horario[i][j][1] != -1) {
                        for(var ik in materias[horario[i][j][0]].dias) 
                            if(materias[horario[i][j][0]].dias[ik].dia == dias[j])
                                break;
                        tmpmaterias += '<tr><td class="' + colores[horario[i][j][0] % 10] + '"><b>' + materias[horario[i][j][0]].materia + '</b><br>' + horas[i]  + ' - ' + horas[i+horario[i][j][1]] + '<br>' + materias[horario[i][j][0]].dias[ik].salon + '</td></tr>';
                    }
                }

                if(tmpmaterias != '')
                    html += tmphtml + tmpmaterias;
            }

            $('.horario-small table').append(html);
            $('.horario-small table').show();
        }
    });
});