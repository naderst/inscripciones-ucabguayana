<?php
$prematricula = array(
	'creditos' => '24',
	'lapso' => '2014-2',
	'materias' =>  array(
        array(
            'codigo' => '1',
            'nombre' => 'Materia 1',
            'creditos' => '5',
            'flag' => '0'
        ),
        array(
            'codigo' => '2',
            'nombre' => 'Materia 2',
            'creditos' => '5',
            'flag' => '0'
        ),
        array(
            'codigo' => '3',
            'nombre' => 'Materia 3',
            'creditos' => '5',
            'flag' => '0'
        ),
        array(
            'codigo' => '4',
            'nombre' => 'Materia 4',
            'creditos' => '5',
            'flag' => '0'
        ),
        array(
            'codigo' => '5',
            'nombre' => 'Materia 5',
            'creditos' => '5',
            'flag' => '0'
        ),
        array(
            'codigo' => '6',
            'nombre' => 'Servicio comunitario',
            'creditos' => '3',
            'flag' => '-1'
        ),
        array(
            'codigo' => '7',
            'nombre' => 'Pasantía',
            'creditos' => '3',
            'flag' => '-1'
        )
    )
);

echo json_encode($prematricula);
?>