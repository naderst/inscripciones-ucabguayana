<?php
require_once(__DIR__.'/../config.php');

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

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");
$notificaciones = pg_query("SELECT * FROM notificaciones");

while($notificacion = pg_fetch_assoc($notificaciones)) {
	if($notificacion['mensaje'] == 'Prematricula') {
		list($correo) = pg_fetch_array(pg_query("SELECT correo_alumno FROM alumnos WHERE id_alumno = '$notificacion[id_alumno]'"));
		mail($correo, 'Prematricula disponible', 'Le informamos que ya puedo realizar su prematricula en línea');
	} else {
		$mensaje = preg_split('/;/', $notificacion['mensaje']);

		if($mensaje[0] == 'Salon') {
			list(,$salon,$id_materia,$dia,$hora_inicio,$hora_fin) = $mensaje;
			list($correo) = pg_fetch_array(pg_query("SELECT correo_alumno FROM alumnos WHERE id_alumno = '$notificacion[id_alumno]'"));
			list($materia) = pg_fetch_array(pg_query("SELECT nombre_materia FROM materias WHERE id_materia = '$id_materia'"));
			$dia = dias($dia);
			mail($correo, 'Salon disponible', 'Le informamos que se asignó el Salon '.$salon.' a la asignatura '.$materia.' el día '.$dia.' desde '.$hora_inicio.' hasta '.$hora_fin);
		}
	}

	pg_query("DELETE FROM notificaciones WHERE id_alumno = '$notificacion[id_alumno]' AND mensaje = '$notificacion[mensaje]'");
}

pg_close($conexion);
?>
