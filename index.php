<?php
session_start();
require_once('config.php');

$app['controller'] = @$_GET['controller'];
$app['action'] = @$_GET['action'];

// Se almacenan los parametros pasados por GET en un arreglo.
if(isset($_GET['params'])) {
	$app['params'] = preg_split('/\//', $_GET['params']);

	foreach($app['params'] as $k => $v) 
		if(trim($v) == '')
			unset($app['params'][$k]);
}

if($app['controller'] == 'logout') {
	foreach($_SESSION as $k => $v)
		unset($_SESSION[$k]);

	header('Location: '.$app['basedir'].'/');
}

if(isset($_SESSION['director']) && $app['controller'] != 'administrativo') {
	header('Location: '.$app['basedir'].'/administrativo');
}

if(isset($_SESSION['usuario']) && $app['controller'] == 'administrativo') {
	header('Location: '.$app['basedir'].'/');
}

if(!isset($_SESSION['usuario']) && !isset($_SESSION['director']))
	require_once('modulos/autenticacion/index.php');
else {
	$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");
	$tupla = pg_fetch_assoc(pg_query("select count(*) as inscritas
                                       from materias_x_alumnos inner join (select max(lapso) as lapso
                                                                            from lapsos) as periodo
                                            on materias_x_alumnos.lapso = periodo.lapso 
                                            and materias_x_alumnos.id_alumno = $_SESSION[usuario]"));
	$showprematricula = !($tupla['inscritas'] > 0);

	if(!$showprematricula && $app['controller'] == 'prematricula')
		$app['controller'] = 'prematricula-fija';
	
	require_once('layouts/default.php');
}
?>
