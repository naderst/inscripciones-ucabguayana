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
				'hora_fin' => '9:00 a.m.'
			)
		)
	)
);

echo json_encode($horario);
print_r($horario);
?>
