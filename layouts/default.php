<!DOCTYPE html>
<html>
	<head>
		<base href="<?php echo $app['basedir']; ?>">
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
	</body>
</html>
