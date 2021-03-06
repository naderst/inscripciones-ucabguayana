<?php
require_once('../config.php');

session_start();
if(!isset($_SESSION["usuario"])){
    header("Location: ".$app['basedir']."/autenticacion");  
}

$conexion = pg_connect("host=".$app["db"]["host"]." port=".$app["db"]["port"]." dbname=".$app["db"]["name"]." user=".$app["db"]["user"]." password=".$app["db"]["pass"]) OR die("No Se Pudo Realizar Conexion");
$futuro = array();
$periodo = $periodo_inicial = pg_fetch_assoc(pg_query("select max(lapso) as lapso from lapsos"));

for($i=0 ; $i<4 ; $i++){
    $creditos_disponibles = 22;
    $ma = "(select materias_x_alumnos.id_materia 
		from materias_x_alumnos
		where (materias_x_alumnos.nota='ap' or (materias_x_alumnos.nota is null or materias_x_alumnos.nota<>'rp' and materias_x_alumnos.nota::int>=10)) 
			and materias_x_alumnos.id_alumno = $_SESSION[usuario])";
    
    $mna = "(select id_materia from materias except $ma)";

    $ca = "(select sum(materias.creditos_materia) as creditos 
                    from materias inner join $ma as ma 
                    on (materias.id_materia = ma.id_materia))";
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

			) as prem on (materias.id_materia = prem.id_materia_prelada and materias.tipo_materia='ob') order by semestre";
    
    $materias = pg_query($prem); 
   
    if(pg_num_rows($materias)==0)
        break;
    
    $creditos_aprobados = pg_fetch_assoc(pg_query($ca));
    $futuro[$i]['creditos_restantes'] = (($aux=181-$creditos_aprobados['creditos'])<0)?0:$aux;
    $futuro[$i]['lapso'] = $periodo['lapso'] = (($periodo['lapso'] % 100)==15)?$periodo['lapso']+10:$periodo['lapso']+90;
    $futuro[$i]['materias'] = array();
    pg_query("insert into lapsos values($periodo[lapso],0)");
    $j=0;
    while($tupla=pg_fetch_assoc($materias)){
        if($tupla['creditos_materia']<=$creditos_disponibles){
            $creditos_disponibles -= $tupla['creditos_materia'];
            $futuro[$i]['creditos_restantes'] -= $tupla['creditos_materia'];
            $futuro[$i]['materias'][$j++] = array('nombre' => $tupla['nombre_materia'],
                                                  'creditos' => $tupla['creditos_materia']);
            pg_query("insert into materias_x_alumnos values($tupla[id_materia],$_SESSION[usuario],$periodo[lapso],'20',401)");
        }else
            break;
    }
}
pg_query("delete from materias_x_alumnos where id_alumno=$_SESSION[usuario] and lapso > $periodo_inicial[lapso]");
pg_query("delete from lapsos where lapso > $periodo_inicial[lapso]");
echo json_encode($futuro);
?>
