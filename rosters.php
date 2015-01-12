<?php

	$res = array(
		'me'      => array('id'=>1, 'image'=>'./image/user/1.jpg', 'name'=>'kink'),
		'rosters' => array(
			array('id'=>2, 'image'=>'./image/user/2.jpg', 'name'=>'用户2'),
			array('id'=>3, 'image'=>'./image/user/3.jpg', 'name'=>'用户3'),
			array('id'=>4, 'image'=>'./image/user/4.jpg', 'name'=>'用户4'),
			array('id'=>5, 'image'=>'./image/user/5.jpg', 'name'=>'用户5'),
			array('id'=>6, 'image'=>'./image/user/6.jpg', 'name'=>'用户6'),
			array('id'=>7, 'image'=>'./image/user/7.jpg', 'name'=>'用户7'),
			array('id'=>8, 'image'=>'./image/user/8.jpg', 'name'=>'用户8'),
			array('id'=>9, 'image'=>'./image/user/9.jpg', 'name'=>'用户9')
		)
	);

	echo json_encode($res);
		