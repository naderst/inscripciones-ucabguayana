<?php
require_once('../config.php');
session_start();
if(!isset($_SESSION["director"])){
    header("Location: ".$app['basedir']."/autenticacion");  
}
$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

$profesores = pg_query("select id_profesor,nombre_profesor,apellido_profesor 
                                        from profesores 
                                        order by nombre_profesor,apellido_profesor");
$periodos = pg_query("select lapso from lapsos order by lapso");
$materias = pg_query("select id_materia,nombre_materia 
                                        from materias order by id_materia");
$onload = array();
$onload['profesor'] = array();
$onload['materia'] = array();
$onload['periodo'] = array();

for($i=0 ;($tupla = pg_fetch_assoc($profesores)) ; $i++)
    $onload['profesor'][$i] = array('cedula' => $tupla['id_profesor'] ,
                                    'nombre' => $tupla['nombre_profesor'] ,
                                    'apellido' => $tupla['apellido_profesor']);

for($i=0 ;($tupla = pg_fetch_assoc($periodos)) ; $i++)
    $onload['periodo'][$i] = $tupla['lapso'];

for($i=0 ;($tupla = pg_fetch_assoc($materias)) ; $i++)
    $onload['materia'][$i] = array('codigo' => $tupla['id_materia'] ,
                                    'nombre' => $tupla['nombre_materia']);

echo json_encode($onload);
?>