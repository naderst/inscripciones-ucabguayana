<?php
$conexion = pg_connect("host=localhost port=5432 dbname=inscripcion user=postgres password=753951") OR die("No Se Pudo Realizar Conexion");
$mensaje = array();
$login = pg_query("select id_alumno
                    from cuentas_x_alumnos
                    where usuario = '$_POST[usuario]' and
                          clave = md5('$_POST[clave]')");
if(($tupla = pg_fetch_array($login))){
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
                                            on materias_x_alumnos.lapso = periodo.lapso"));
   $mensaje['msg'] = ($tupla['inscritas']==0)?"FRONTEND DE COLS":"FRONTEND DE NADER";
}
else{
    $login = pg_query("select id_profesor
                        from cuentas_x_profesores
                        where usuario = '$_POST[usuario]' and
                              clave = md5('$_POST[clave]')");
    if(($tupla = pg_fetch_array($login))){
        session_start();
        $_SESSION['director'] = $tupla['id_profesor'];
        $tupla = pg_fetch_assoc(pg_query("select nombre_profesor,apellido_profesor
                                            from profesores
                                            where id_profesor = $tupla[id_profesor]"));
        $mensaje['flag'] = 1;
        $mensaje['nombre'] = $tupla['nombre_profesor']." ".$tupla['apellido_profesor'];
        $mensaje['msg'] = "FRONTEND DE MOISES (DIRECTIVO)";
    }
    else{
        $mensaje['flag'] = 0;
        $mensaje['nombre'] = "";
        $mensaje['msg'] = "USUARIO O CLAVE INVALIDA";
    }
}
echo json_encode($mensaje);
?>
