<?php
$semestres = array(
	array(
		'creditos_restantes' => '30',
		'lapso' => '2014-2',
		'materias' => array(
			'Materia 1',
			'Materia 2'
		)
	),
	array(
		'creditos_restantes' => '30',
		'lapso' => '2015-1',
		'materias' => array(
			'Materia 1',
			'Materia 2',
			'Materia 3',
			'Materia 4'
		)
	),
	array(
		'creditos_restantes' => '30',
		'lapso' => '2015-2',
		'materias' => array(
            'Materia 1',
			'Materia 2',
			'Materia 3'
		)
	),
	array(
		'creditos_restantes' => '30',
		'lapso' => '2016-1',
		'materias' => array(
			'Materia 1',
			'Materia 2',
			'Materia 3',
			'Materia 4',
			'Materia 5'
		)
	)
);

echo json_encode($semestres);
?>