<?php
require_once('../config.php');
session_start();
if(!isset($_SESSION["director"])){
        /*session_destroy();
         * header("Location: /modulo/autenticacion/index.php"); 
         */
}
$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

if(isset($_POST['creditos']) and isset($_POST['flag'])){
    switch ($_POST['flag']){
        case 2: $signo = "<";
                break;
        case 1: $signo = ">";
                break;
        default: $signo= "=";
    }
    $axc = ",(select id_alumno,sum(materias.creditos_materia) as creditos
                from materias_x_alumnos inner join materias
                     on(materias_x_alumnos.id_materia = materias.id_materia and
                       (materias_x_alumnos.nota='ap' or (materias_x_alumnos.nota<>'rp' and materias_x_alumnos.nota::int>=10)))
                group by id_alumno
                having sum(materias.creditos_materia) $signo $_POST[creditos]) as axc";
    $condicion_axc = "and alumnos.id_alumno = axc.id_alumno";
}
else
{
    $axc = $condicion_axc = "";
}

$consulta = pg_query("select distinct alumnos.id_alumno,alumnos.nombre_alumno,alumnos.apellido_alumno
                       from alumnos,materias_x_alumnos,materias_x_profesores $axc
                       where alumnos.id_alumno = materias_x_alumnos.id_alumno and
                             materias_x_profesores.id_materia = materias_x_alumnos.id_materia and
                             materias_x_profesores.lapso = materias_x_alumnos.lapso and
                             materias_x_profesores.seccion = materias_x_alumnos.seccion 
                             $condicion_axc ".
                             ((isset($_POST['periodo']))?"and materias_x_alumnos.lapso = $_POST[periodo] ":"").
                             ((isset($_POST['asignatura']))?"and materias_x_alumnos.id_materia = $_POST[asignatura] ":"").
                             ((isset($_POST['profesor']))?"and materias_x_profesores.id_profesor = $_POST[profesor] ":"").
                             ((isset($_POST['letra']))?"and lower(substr(alumnos.apellido_alumno,1,1)) = '$_POST[letra]' ":"").
                             "order by apellido_alumno");
$respuesta = array();
for($i = 0 ; ($tupla = pg_fetch_assoc($consulta)) ; $i++)
    $respuesta[$i] = array('cedula' => $tupla['id_alumno'] ,
                           'nombre' => $tupla['nombre_alumno'] ,
                           'apellido' => $tupla['apellido_alumno']);

echo json_encode($respuesta);
?>
