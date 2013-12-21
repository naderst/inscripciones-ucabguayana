<!DOCTYPE html>
<html>
	<head>
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
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script>basedir = '<?php echo $app['basedir']; ?>';</script>
		<?php
			if($app['controller'] == 'horario')
				echo '<script src="'.$app['basedir'].'/js/horario.js"></script>';
		?>
	</body>
</html>
