<?php
require_once('../config.php');

$mensaje = array();
session_start();
if(!isset($_SESSION["usuario"])){
        header("Location: ".$app['basedir']."/autenticacion");
}
$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");
$validacion = pg_fetch_assoc(pg_query("select count(*) as inscritas
                                       from materias_x_alumnos inner join (select max(lapso) as lapso
                                                                            from lapsos) as periodo
                                            on materias_x_alumnos.lapso = periodo.lapso 
                                            and materias_x_alumnos.id_alumno = $_SESSION[usuario]"));

if($validacion['inscritas']>0)
    die ("ERROR ACCESO NO PERMITIDO");

$periodo = $periodo_inicial = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));
foreach ($_POST['materias'] as $codigo)
    pg_query("insert into materias_x_alumnos values($codigo,$_SESSION[usuario],$periodo[lapso],null,401)");
$mensaje['flag']=1;
$mensaje['msg'] = "/horario/";

echo json_encode($mensaje);
?>
