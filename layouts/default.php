<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Ingreso de prematrícula</title>
    <meta name="robots" content="noodp, noydir" />
    <meta name="description" content="Selecciona las materias que deseas cursar este semestre." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/prematricula.css'; ?>' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/font-awesome.min.css'?>' rel='stylesheet' type='text/css'>
</head>

<body>
    <header id="header">
        <div class="contenedor">
            <nav>
                <ul class="menu inline">
                    <li>
                        <a href="<?php echo $app['basedir'].'/prematricula'; ?>">
                            <i class="fa fa-th-list"></i>Prematrícula</a>
                    </li>
                    <li>
                        <a href="<?php echo $app['basedir'].'/horario'; ?>">
                            <i class="fa fa-clock-o"></i>Horario</a>
                    </li>
                    <li class="usuario">
                        <a href="javascript:void(0)">
                            <i class="fa fa-user"></i>Nombre Apellido</a>
                    </li>
                    <li class="fix"></li>
                </ul>
            </nav>
        </div>
    </header>
		<?php
			/*
				NO TOCAR a menos que sepas lo que estás haciendo.
				Aquí se renderizan las vistas o un error 404.
			*/
			if(!@include_once('modulos/'.str_replace('-', '_', $app['controller']).'/'.$app['action'].'.php'))
				require_once('modulos/errors/404.php');
		?> 
    <div id="maia-signature"></div>
    <footer id="footer">
        <div class="contenedor">Universidad Católica Andrés Bello</div>
    </footer>
	<?php echo '<script src="'.$app['basedir'].'/js/jquery-1.10.2.min.js"></script>'; ?>
	<script>basedir = '<?php echo $app['basedir']; ?>';</script>
	<?php
		if($app['controller'] == 'horario')
			echo '<script async defer src="'.$app['basedir'].'/js/horario.js"></script>';
		if($app['controller'] == 'prematricula')
			echo '<script async defer src="'.$app['basedir'].'/js/prematricula.js"></script>';
	?>
</body>

</html>