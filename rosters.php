<?php

	$id = empty($_GET['id']) ? 1 : $_GET['id'];

	$rosters = array(
		'1' => array('id'=>1, 'image'=>'./image/user/1.jpg', 'name'=>'艾伦', 'watch'=>'2,3,4,5,6,7,8,9'),
		'2' => array('id'=>2, 'image'=>'./image/user/2.jpg', 'name'=>'毕维斯', 'watch'=>'1,4,7,8'),
		'3' => array('id'=>3, 'image'=>'./image/user/3.jpg', 'name'=>'拜伦', 'watch'=>'1,2,6,5'),
		'4' => array('id'=>4, 'image'=>'./image/user/4.jpg', 'name'=>'道格拉斯', 'watch'=>'7,8,9'),
		'5' => array('id'=>5, 'image'=>'./image/user/5.jpg', 'name'=>'爱德华', 'watch'=>'4,6,8,9'),
		'6' => array('id'=>6, 'image'=>'./image/user/6.jpg', 'name'=>'加布力尔', 'watch'=>'1,3,5,7,9'),
		'7' => array('id'=>7, 'image'=>'./image/user/7.jpg', 'name'=>'雨果', 'watch'=>'2,4,5,8'),
		'8' => array('id'=>8, 'image'=>'./image/user/8.jpg', 'name'=>'里斯特', 'watch'=>'1,4,6,7,9'),
		'9' => array('id'=>9, 'image'=>'./image/user/9.jpg', 'name'=>'玛希', 'watch'=>'2,3,4,5,6,7,8')
	);

	$len = $id;

	$res = array();
	$res['me'] = $rosters[$id];

	$ids = explode(',', $rosters[$id]['watch']);
	foreach( $ids as $k=>$v ) {
		$res['rosters'][] = $rosters[$v];
	}

	echo json_encode($res);