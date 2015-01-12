<?php

	$appId = "0s66p2ntvx0q56pk5mh8wxa7cuegr57w5abvb7nwv5dqymyo";
	$masterKey = "69jeuvv9m9qc6ruqvo8zoe2l9ksztz7p9oembgmba4dymfih";

	$peerId = $_POST['self_id'];
	$watchIds = $_POST['watch_ids'];
	$superPeer = isset($_POST['sp']) ? $_POST['sp'] : false;

    $watchs = explode(":", $watchIds);
    sort($watchs, SORT_STRING);
    $watchIds = $watchs;//explode(':', '2:20:25:28:4:5:7:8');
 	
    $ts = time();
    $nonce = randomString();
 	
    $mArray = array($appId, $peerId, implode(':', $watchIds), $ts, $nonce);

    $msg = implode(':', $mArray);
    if( $superPeer ) {
        $msg .= ":sp";
    }

    $sig = sign($msg, $masterKey);

    $res = array("nonce" => $nonce, "timestamp" => $ts, "signature" => $sig, "watchIds" => $watchIds, "sp" => $superPeer);
 
    echo json_encode($res);


	function sign($str, $key) {
        $signature = "";
        if (function_exists('hash_hmac')) {
            $hmac = hash_hmac("sha1", $str, $key, true);
            $signature = bin2hex($hmac);
        } else {
            $blocksize = 64;
            $hashfunc = 'sha1';
            if (strlen($key) > $blocksize) {
                $key = pack('H*', $hashfunc($key));
            }
            $key = str_pad($key, $blocksize, chr(0x00));
            $ipad = str_repeat(chr(0x36), $blocksize);
            $opad = str_repeat(chr(0x5c), $blocksize);
            $hmac = pack(
                    'H*', $hashfunc(
                            ($key ^ $opad) . pack(
                                    'H*', $hashfunc(
                                            ($key ^ $ipad) . $str
                                    )
                            )
                    )
            );
            $signature = bin2hex($hmac);
        }
        return $signature;
    }

	function randomString( $length = 8 ) {  
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
        $ret = "";  
        for ( $i = 0; $i < $length; $i++ )  
        {  
            $ret .= $chars[ mt_rand(0, strlen($chars) - 1) ];  
        }  
        return $ret;  
    } 
