<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"> 
		<title></title>
	</head>
	<body>
		<?php
			/*
				NO TOCAR a menos que sepas lo que estás haciendo.
				Aquí se renderizan las vistas o un error 404.
			*/
			if(!@include_once('modulos/'.str_replace('-', '_', $app['controller']).'/'.$app['action'].'.php'))
				require_once('modulos/errors/404.php');
		?>
		<?php echo '<script src="'.$app['basedir'].'/js/jquery-1.10.2.min.js"></script>'; ?>
		<script>basedir = '<?php echo $app['basedir']; ?>';</script>
		<?php
			if($app['controller'] == 'horario')
				echo '<script src="'.$app['basedir'].'/js/horario.js"></script>';
		?>
	</body>
</html>
