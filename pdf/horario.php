<?php
session_start();
require_once('../config.php');

function dias($d){
    switch ($d){
        case 'l':return 'Lunes';
        case 'm':return 'Martes';
        case 'i':return 'Miércoles';
        case 'j':return 'Jueves';
        case 'v':return 'Viernes';
        case 's':return 'Sábado';
    }
}

if(!isset($_SESSION["usuario"])){
    header("Location: ".$app['basedir']."/autenticacion");  
}

require_once('../mpdf/mpdf.php');

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

$horario = array();
$i = $j = -1;
$aux = "";
$periodo = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));

$ma = "(select mxa.id_materia,m.nombre_materia,mxa.lapso,mxa.seccion 
        from materias_x_alumnos as mxa inner join materias as m on (mxa.id_alumno=$_SESSION[usuario] and 
                                                                    mxa.lapso = $periodo[lapso] and
                                                                    mxa.id_materia = m.id_materia))";

$consulta = pg_query("select ma.nombre_materia,mxs.id_salon,p.nombre_profesor,p.apellido_profesor,mxs.dia,mxs.hora_inicio,mxs.hora_fin
             from (($ma as ma inner join materias_x_salon as mxs on (ma.id_materia=mxs.id_materia and ma.lapso = mxs.lapso and ma.seccion = mxs.seccion))
                   left join materias_x_profesores as mxp on (ma.id_materia=mxp.id_materia and ma.lapso=mxp.lapso and ma.seccion=mxp.seccion))
                   left join profesores as p on (mxp.id_profesor=p.id_profesor)");;

while($tupla = pg_fetch_assoc($consulta)){
    if($aux != $tupla['nombre_materia']){
        $i++;
        $horario[$i]['materia'] = $aux = $tupla['nombre_materia'];
        $horario[$i]['profesor'] = ($tupla['nombre_profesor']==null)?'':$tupla['nombre_profesor'].' '.$tupla['apellido_profesor'];
        $horario[$i]['dias'] = array();
        $j=0;
    }
    $horario[$i]['dias'][$j++] = array('dia' => dias($tupla['dia']),
                                       'hora_inicio' => $tupla['hora_inicio'],
                                       'hora_fin' => $tupla['hora_fin'],
                                       'salon' => $tupla['id_salon']);
}

$materias = $horario;
$colores = array('m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10');
$dias = array('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
$horas = array('7:00 a.m.', '7:30 a.m.', '8:00 a.m.', '8:30 a.m.', '9:00 a.m.', '9:30 a.m.', '10:00 a.m.', '10:30 a.m.', '11:00 a.m.', '11:30 a.m.', '12:00 p.m.', '12:30 p.m.', '1:00 p.m.', '1:30 p.m.', '2:00 p.m.', '2:30 p.m.', '3:00 p.m.', '3:30 p.m.', '4:00 p.m.', '4:30 p.m.', '5:00 p.m.', '5:30 p.m.', '6:00 p.m.', '6:30 p.m.', '7:00 p.m.', '7:30 p.m.', '8:00 p.m.', '8:30 p.m.', '9:00 p.m.', '9:30 p.m.', '10:00 p.m.', '');
$horario = array_pad(array(), count($horas), null);

for($i = 0; $i < count($horario); ++$i)
	$horario[$i] = array_pad(array(), count($dias), null);

foreach($materias as $i => $v) {
	foreach($materias[$i]['dias'] as $j => $v) {
		$ik = array_search($materias[$i]['dias'][$j]['hora_inicio'], $horas);
		$jk = array_search($materias[$i]['dias'][$j]['dia'], $dias);
		$rowspan = array_search($materias[$i]['dias'][$j]['hora_fin'], $horas) - array_search($materias[$i]['dias'][$j]['hora_inicio'], $horas) + 1;
		$rowspan--;
		$horario[$ik][$jk] = array($i, $rowspan);

		for($k = $ik + 1; $k <= $ik + $rowspan - 1; ++$k)
			$horario[$k][$jk] = array($i, -1);
	}
}

$html = '<table border="0" class="horario" width="100%" cellspacing="0" cellpadding="0">
			<tbody><tr>
				<th>Hora</th>
				<th>Lunes</th>
				<th>Martes</th>
				<th>Miércoles</th>
				<th>Jueves</th>
				<th>Viernes</th>
				<th>Sábado</th>
			</tr>';

for($i = 0; $i < count($horario) - 2; ++$i) {
	$html .= '<tr>';
	$html .= '<td class="hora">'.substr($horas[$i], 0, 5).'-'.substr($horas[$i+1],0,5).'</td>';

	for($j = 0; $j < count($horario[$i]); ++$j) {
		if (!is_array($horario[$i][$j]))
			$html .= '<td>&nbsp;</td>';
		elseif ($horario[$i][$j][1] != -1) {
            $mdias = $materias[$horario[$i][$j][0]]['dias'];
            foreach($mdias as $dia => $v) {
                if($mdias[$dia]['dia'] == $dias[$j] && $mdias[$dia]['hora_inicio'] == $horas[$i])
                    break;
            }
			$html .= '<td class="materia '.$colores[$horario[$i][$j][0] % 10].'" rowspan="'.$horario[$i][$j][1].'">'.$materias[$horario[$i][$j][0]]['materia'].'<br>('.$materias[$horario[$i][$j][0]]['dias'][$dia]['salon'].')</td>';
		}
	}

	$html .= '</tr>';
}

$html .= '</tbody></table>';

$mpdf = new mPDF('', 'Letter-L', '', '', '', 'L');
$stylesheet = file_get_contents('../css/horario_pdf.css');
$mpdf->WriteHTML($stylesheet, 1);
$mpdf->WriteHTML($html,2);
$mpdf->Output();
exit;
?>