<?php
require_once('../config.php');
session_start();
if(!isset($_SESSION["usuario"])){
    header("Location: ".$app['basedir']."/autenticacion");  
}
$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

$ca = "(select sum(materias.creditos_materia) as creditos 
		from materias inner join (select materias.id_materia 
                                            from materias_x_alumnos inner join materias 
                                            on (materias_x_alumnos.id_materia=materias.id_materia 
                                            and (materias_x_alumnos.nota='ap' or ( materias_x_alumnos.nota<>'rp' and materias_x_alumnos.nota::int>=10)) 
                                            and materias_x_alumnos.id_alumno = $_SESSION[usuario])) as ma 
		on (materias.id_materia = ma.id_materia))";

$prematricula = array();
$periodo = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));
$creditos_aprobados =  pg_fetch_assoc(pg_query($ca));
$materias = pg_query("select materias.nombre_materia,materias.creditos_materia
                        from materias inner join materias_x_alumnos 
                        on (materias.id_materia=materias_x_alumnos.id_materia 
                            and materias_x_alumnos.lapso=$periodo[lapso]
                            and materias_x_alumnos.id_alumno=$_SESSION[usuario])");

$i=0;
$prematricula['creditos_restantes'] = $prematricula['creditos_curso'] = 0;
$prematricula['lapso'] = $periodo['lapso'];

while($tupla=  pg_fetch_assoc($materias))
    $prematricula['creditos_curso'] += $tupla['creditos_materia'];

$prematricula['creditos_restantes'] = (($aux=181-$creditos_aprobados['creditos']-$prematricula['creditos_curso'])<0)?0:$aux;

echo json_encode($prematricula);
?>