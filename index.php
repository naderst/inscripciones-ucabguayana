<?php
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

require_once('layouts/default.php');
?>