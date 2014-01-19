<?php
/* ARCHIVO DE PRUEBA */
require_once('../config.php');

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

$query = "
	SELECT COUNT(*) as inscritas
	FROM materias_x_alumnos m,
	     lapsos l
	WHERE CAST(l.lapso AS TEXT) LIKE '".date('Y', time())."%'
	  AND m.id_alumno = '$_SESSION[usuario]'
	GROUP BY(m.lapso) HAVING m.lapso = MAX(l.lapso);
";

$pready = pg_fetch_assoc(pg_query($query));

print_r($pready);
pg_close($conexion);
?>