<?php
$horario = array(
	array(
		'materia' => 'Calculo I',
		'profesor' => 'Faustino',
		'dias' => array(
			array(
				'dia' => 'Lunes',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '9:00 a.m.',
				'salon' => 'A2-12'
			),
			array(
				'dia' => 'Jueves',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '8:00 a.m.',
				'salon' => 'A2-11'
			)
		)
	),
	array(
		'materia' => 'Algoritmos y Programación I',
		'profesor' => 'El programmer',
		'dias' => array(
			array(
				'dia' => 'Lunes',
				'hora_inicio' => '2:00 p.m.',
				'hora_fin' => '4:00 p.m.',
				'salon' => 'A2-12'
			),
			array(
				'dia' => 'Jueves',
				'hora_inicio' => '10:00 a.m.',
				'hora_fin' => '12:30 p.m.',
				'salon' => 'A2-12'
			)
		)
	),
	array(
		'materia' => 'Geometria Descriptiva',
		'profesor' => 'El drawer',
		'dias' => array(
			array(
				'dia' => 'Viernes',
				'hora_inicio' => '7:00 a.m.',
				'hora_fin' => '9:30 a.m.',
				'salon' => 'AR-22'
			),
			array(
				'dia' => 'Sábado',
				'hora_inicio' => '10:00 a.m.',
				'hora_fin' => '12:00 p.m.',
				'salon' => 'A2-12'
			)
		)
	)
);

echo json_encode($horario);
?>