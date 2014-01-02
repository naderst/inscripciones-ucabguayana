<?php
require_once('../config.php');

session_start();
if(!isset($_SESSION["usuario"])){
        /*session_destroy();
         * header("Location: /modulo/autenticacion/index.php"); 
         */
	$_SESSION["usuario"] = 22588454;
}

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");
$validacion = pg_fetch_assoc(pg_query("select count(*) as inscritas
                                       from materias_x_alumnos inner join (select max(lapso) as lapso
                                                                            from lapsos) as periodo
                                            on materias_x_alumnos.lapso = periodo.lapso 
                                            and materias_x_alumnos.id_alumno = $_SESSION[usuario]"));

if($validacion['inscritas']>0)
    die ("ERROR ACCESO NO PERMITIDO");

$prematricula = array();
$prematricula['lapso'] = $prematricula['creditos'] = 0;
$prematricula['materias'] = array();
$i = 0;

$ma = "(select materias.id_materia 
		from materias_x_alumnos inner join materias 
		on (materias_x_alumnos.id_materia=materias.id_materia 
			and (materias_x_alumnos.nota='ap' or ( materias_x_alumnos.nota<>'rp' and materias_x_alumnos.nota::int>=10)) 
			and materias_x_alumnos.id_alumno = $_SESSION[usuario]))";


$mna = "(select id_materia from materias except $ma)";

$ca = "(select sum(materias.creditos_materia) as creditos 
		from materias inner join $ma as ma 
		on (materias.id_materia = ma.id_materia))";

$suficiencia = pg_fetch_assoc(pg_query("select suficiencia_ingles from alumnos where id_alumno = $_SESSION[usuario]"));

if($suficiencia['suficiencia_ingles']=='t')
    $condicion = "";
else{
    $condicion = "and materias.semestre < 7";
    $prematricula['materias'][$i++] = array("codigo" => 7400, "nombre" => "Prueba de Suficiencia de Ingles", "creditos" => 0, "flag" => -1);
}

$prem = "select * from materias inner join 
		((select p.id_materia_prelada
			from ($ma as ma inner join prelaciones_materias 
				 on (ma.id_materia=prelaciones_materias.id_materia_preladora)) as p
				 inner join $mna as mna on (p.id_materia_prelada = mna.id_materia) 

			union 

		   select k.id_materia_prelada
			from ($mna as mna inner join prelaciones_numericas
				 on (mna.id_materia=prelaciones_numericas.id_materia_prelada)) as k
				 inner join $ca as ca on (ca.creditos>=k.creditos_prelacion)
                                     
                        union         
                                     
                    select materias.id_materia as id_materia_prelada 
                        from materias inner join $mna as mna 
                            on (materias.id_materia = mna.id_materia and materias.semestre=1)
			) 
			
			except 

			select p.id_materia_prelada
			from ($mna as mna inner join prelaciones_materias 
				 on (mna.id_materia=prelaciones_materias.id_materia_preladora)) as p
				 inner join $mna as mna on (p.id_materia_prelada = mna.id_materia) 

			) as prem on (materias.id_materia = prem.id_materia_prelada $condicion) order by semestre";

$menor_semestre = 0;
$materias = pg_query($prem);
$periodo = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));
$creditos_aprobados = pg_fetch_assoc(pg_query($ca));
$reprobadas = pg_fetch_assoc(pg_query("select count(*) as nrep 
                                    from materias_x_alumnos 
                                    where id_alumno=$_SESSION[usuario] and (nota='rp' or (nota<>'ap' and nota::int<10))"));

if($creditos_aprobados['creditos']>=164)
    $prematricula['creditos']=29;
else
    if($reprobadas['nrep']==0 and $creditos_aprobados['creditos']>=57)
        $prematricula['creditos']=24;
    else
        $prematricula['creditos']=22;
    
$prematricula['lapso'] = $periodo['lapso'];

while($tupla = pg_fetch_assoc($materias)){
    if($menor_semestre == 0)
        $menor_semestre = $tupla['semestre'];
    switch($tupla['id_materia']){
        case 10402: if($creditos_aprobados['creditos']>=173){
                        $prematricula['materias'][$i++] = array("codigo" => 10402, 
                                                                "nombre" => $tupla['nombre_materia'],
                                                                "creditos" => $tupla['creditos_materia'],
                                                                "flag" => -1);
                    }
                    break;
        case 10403:if($creditos_aprobados['creditos']>=173){
                        $prematricula['materias'][$i++] = array("codigo" => 10403, 
                                                                "nombre" => $tupla['nombre_materia'],
                                                                "creditos" => $tupla['creditos_materia'],
                                                                "flag" => -1);
                    }
                    break;
        default:$prematricula['materias'][$i++] = array("codigo" => $tupla['id_materia'], 
                                                        "nombre" => $tupla['nombre_materia'],
                                                        "creditos" => $tupla['creditos_materia'],
                                                        "flag" => (($tupla['tipo_materia']=='ne')?-1:$tupla['semestre']-$menor_semestre));
    }
    
}
 
echo json_encode($prematricula);
?>