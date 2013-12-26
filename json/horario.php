<?php
$horario = array(
	array(
		'materia' => 'Calculo I',
		'salon' => 'A2-11',
		'profesor' => 'Faustino',
		'dias' => array(
			array(
				'dia' => 'Lunes',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '9:00 a.m.'
			),
			array(
				'dia' => 'Jueves',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '8:00 a.m.'
			)
		)
	),
	array(
		'materia' => 'Algoritmos y Programación I',
		'salon' => 'A2-12',
		'profesor' => 'El programmer',
		'dias' => array(
			array(
				'dia' => 'Lunes',
				'hora_inicio' => '2:00 p.m.',
				'hora_fin' => '4:00 p.m.'
			),
			array(
				'dia' => 'Jueves',
				'hora_inicio' => '10:00 a.m.',
				'hora_fin' => '12:30 p.m.'
			)
		)
	),
	array(
		'materia' => 'Geometria Descriptiva',
		'salon' => 'AR-22',
		'profesor' => 'El drawer',
		'dias' => array(
			array(
				'dia' => 'Viernes',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '9:30 a.m.'
			)
		)
	)
);

echo json_encode($horario);
?>