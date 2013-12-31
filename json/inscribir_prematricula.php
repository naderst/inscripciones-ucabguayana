<?php
$mensaje = array();
session_start();
if(!isset($_SESSION["usuario"])){
        /*session_destroy();
         * header("Location: /modulo/autenticacion/index.php"); 
         */
	$_SESSION["usuario"] = 22588454;
}
$conexion = pg_connect("host=localhost port=5432 dbname=inscripciones-ucabguayana user=postgres password=brilight7") OR die("No Se Pudo Realizar Conexion");

$futuro = array();
$periodo = $periodo_inicial = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));
foreach ($_POST['materias'] as $codigo)
    pg_query("insert into materias_x_alumnos values($codigo,$_SESSION[usuario],$periodo[lapso],null,401)");
$mensaje['flag']=1;
$mensaje['msg'] = "AQUI VA LA DIRECCION DE FRONTEND DE PREMATRICULA DE NADER";

echo json_encode($mensaje);
?>
