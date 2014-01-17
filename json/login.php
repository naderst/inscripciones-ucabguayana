<?php
require_once('../config.php');

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");

$mensaje = array();
$login = pg_query("select id_alumno
                    from alumnos
                    where id_alumno = $_POST[usuario] and
                          clave = md5('$_POST[clave]')");
if(($tupla = pg_fetch_array($login))){
    $hold = pg_query("select nombre_hold,descripcion_hold 
                        from alumnos_x_holds inner join holds
                            on(alumnos_x_holds.id_hold = holds.id_hold
                             and alumnos_x_holds.id_alumno = $_POST[usuario])");
    if(pg_num_rows($hold)!=0){
        $mensaje['flag'] = 0;
        $mensaje['msg'] = "";
        while (($tupla=  pg_fetch_assoc($hold)))
                $mensaje['msg'] .= "$tupla[nombre_hold] : $tupla[descripcion_hold] | ";
    }else{
        session_start();
        $_SESSION['usuario'] = $tupla['id_alumno'];
        $tupla = pg_fetch_assoc(pg_query("select nombre_alumno,apellido_alumno
                                           from alumnos
                                           where id_alumno = $tupla[id_alumno]"));
        $mensaje['flag'] = 1;
        $mensaje['nombre'] = $tupla['nombre_alumno']." ".$tupla['apellido_alumno'];
        $tupla = pg_fetch_assoc(pg_query("select count(*) as inscritas
                                           from materias_x_alumnos inner join (select max(lapso) as lapso
                                                                                from lapsos) as periodo
                                                on materias_x_alumnos.lapso = periodo.lapso 
                                                and materias_x_alumnos.id_alumno = $_SESSION[usuario]"));
       $mensaje['msg'] = ($tupla['inscritas']==0)?"/prematricula/":"/prematricula-fija/";
    }
}
else{
    $login = pg_query("select id_profesor
                        from cuentas_x_profesores
                        where id_profesor = $_POST[usuario] and
                              clave = md5('$_POST[clave]')");
    if(($tupla = pg_fetch_array($login))){
        session_start();
        $_SESSION['director'] = $tupla['id_profesor'];
        $tupla = pg_fetch_assoc(pg_query("select nombre_profesor,apellido_profesor
                                            from profesores
                                            where id_profesor = $tupla[id_profesor]"));
        $mensaje['flag'] = 1;
        $mensaje['nombre'] = $tupla['nombre_profesor']." ".$tupla['apellido_profesor'];
        $mensaje['msg'] = "/administrativo";
    }
    else{
        $mensaje['flag'] = 0;
        $mensaje['nombre'] = "";
        $mensaje['msg'] = "Usuario o clave inválida";
    }
}
echo json_encode($mensaje);
?>
