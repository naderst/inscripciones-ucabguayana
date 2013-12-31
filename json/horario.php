<?php

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



session_start();
if(!isset($_SESSION["usuario"])){
        /*session_destroy();
         * header("Location: /modulo/autenticacion/index.php"); 
         */
	$_SESSION["usuario"] = 22588454;
}

$conexion = pg_connect("host=localhost port=5432 dbname=inscripciones-ucabguayana user=postgres password=brilight7") OR die("No Se Pudo Realizar Conexion");

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

echo json_encode($horario);

?>
