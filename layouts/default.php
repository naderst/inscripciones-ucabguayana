<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Prematrícula - UCAB Guayana</title>
    <meta name="robots" content="noodp, noydir" />
    <meta name="description" content="Ingreso de prematrícula y consulta de horario." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/default.css'; ?>' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/font-awesome.min.css'?>' rel='stylesheet' type='text/css'>
    <?php
        if($app['controller'] == 'prematricula')
            echo "<link href='$app[basedir]/css/prematricula.css' rel='stylesheet' type='text/css'>";
            echo "<link href='$app[basedir]/css/preload.css' rel='stylesheet' type='text/css'>";
        if($app['controller'] == 'horario')
            echo "<link href='$app[basedir]/css/horario.css' rel='stylesheet' type='text/css'>";
        if($app['controller'] == 'prematricula-fija')
            echo "<link href='$app[basedir]/css/prematricula_fija.css' rel='stylesheet' type='text/css'>";
        if($app['controller'] == 'administrativo')
            echo "<link href='$app[basedir]/css/administrativo.css' rel='stylesheet' type='text/css'>";
    ?>
</head>

<body>
    <header id="header">
        <div class="contenedor">
            <nav>
                <ul class="menu inline">
                    <?php
                        if(!isset($_SESSION['director'])) {
                    ?>
                    <li>
                        <a href="<?php echo $app['basedir'].'/prematricula'; ?>">
                            <i class="fa fa-th-list"></i>Prematrícula</a>
                    </li>
                    <li>
                        <a href="<?php echo $app['basedir'].'/horario'; ?>">
                            <i class="fa fa-clock-o"></i>Horario</a>
                    </li>
                    <?php } ?>
                    <li class="usuario">
                        <a title="Cerrar sesión" href="<?php echo $app['basedir'].'/logout'; ?>">
                            <i class="fa fa-user"></i><i class="fa fa-sign-out"></i><span id="nombre-usuario"></span></a>
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
	<script>
        if (typeof (Storage) !== "undefined") {
            $('#nombre-usuario').html(localStorage['nombre']);
        } else {
            $('.usuario').hide();
        }
	</script>
	<?php
		if($app['controller'] == 'horario')
			echo '<script async defer src="'.$app['basedir'].'/js/horario.js"></script>';
		if($app['controller'] == 'prematricula')
			echo '<script async defer src="'.$app['basedir'].'/js/prematricula.js"></script>';
        if($app['controller'] == 'prematricula-fija')
			echo '<script async defer src="'.$app['basedir'].'/js/prematricula_fija.js"></script>';
        if($app['controller'] == 'administrativo')
			echo '<script async defer src="'.$app['basedir'].'/js/administrativo.js"></script>';
	?>
</body>

</html>