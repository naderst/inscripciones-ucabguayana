<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Inscripción académica - UCAB Guayana</title>
    <meta name="robots" content="noodp, noydir" />
    <meta name="description" content="Ingreso de prematrícula y consulta de horario." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/autenticacion.css '; ?>' rel='stylesheet' type='text/css'>
    <link href='<?php echo $app['basedir'].'/css/font-awesome.min.css '?>' rel='stylesheet' type='text/css'>
</head>

<body>
    <img src="img/body-bg.png" alt="" class="fondo">
    <div id="pagina">
        <h1 id="titulo">La inscripción académica</h1>
        <h2 id="subtitulo">Hecha sencilla</h2>

        <form id="login" action="">
            <div class="campo">
                <i class="fa fa-user"></i>
                <input type="text" value="Cédula de identidad">
            </div>
            <div class="campo">
                <i class="fa fa-lock"></i>
                <input type="password" value="contraseña">
            </div>
            <a id="iniciar-sesion" href="javascript:void(0)" class="boton">Iniciar sesión</a>
            <div class="fix"></div>
        </form>
    </div>
    <script>basedir = '<?php echo $app['basedir']; ?>';</script>
    <?php echo '<script src="'.$app['basedir']. '/js/jquery-1.10.2.min.js"></script>'; ?>
    <?php echo '<script async defer src="'.$app['basedir']. '/js/autenticacion.js"></script>'; ?>
</body>

</html>