<?php

	if( empty($_POST['convid']) ) {
		echo '';
		return;
	}

	sort($_POST['convid'], SORT_STRING);

	$_POST['convid'] = md5(implode(':', $_POST['convid']));

	$header = array(
		"X-AVOSCloud-Application-Id: 0s66p2ntvx0q56pk5mh8wxa7cuegr57w5abvb7nwv5dqymyo",
		"X-AVOSCloud-Application-Key: m4qivbjnn77tyox755169eslqtof174pq7tzaummnu3va9g4"
	);

	$res = httpRequest( 'https://leancloud.cn/1.1/rtm/messages/logs/', 'get', $_POST, $header);

	echo $res;


	function httpRequest( $url, $method, $params=array(), $header=array() ) {

		if(trim($url)==''||!in_array($method,array('get','post'))||!is_array($params)){
			return false;
		}

		$curl = curl_init();

		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

		if( !empty($header) ) {
			curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
		}

		curl_setopt($curl, CURLOPT_HEADER, 0);
		
		
		switch($method){
			case 'get':
				$str = '?';
				foreach($params as $k=>$v){
					$str .= $k.'='.$v.'&';
				}
				$str = substr($str,0,-1);
				$url .= $str; //$url=$url.$str;
				
				curl_setopt($curl, CURLOPT_URL, $url);

				break;

			case 'post':
				curl_setopt($curl, CURLOPT_URL, $url);
				curl_setopt($curl, CURLOPT_POST, 1);
				curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

				break;

			default:
				$result = '';

				break;
		}

		
		$result = curl_exec($curl);
		
		curl_close($curl);

		return $result;
	}
