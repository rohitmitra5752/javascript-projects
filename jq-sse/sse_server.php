<?php
	header('Content-Type: text/event-stream');
	header('Cache-Control: no-cache');
	header('Connection: keep-alive');

	date_default_timezone_set('Asia/Kolkata');
	
	$retryTime = rand(1,30);
	$eventID = 1;
	$eventType = "Dummy Event";
	echo "id: ". $eventID . "\n";
	echo "retry: " . ($retryTime * 1000) . "\n";
	echo "event : " . $eventType . "\n";
	echo "data:{\n";
	echo "data:\"dateVal\":\"" . date('r'). "\",\n";
	echo "data:\"waitTime\":" . $retryTime."\n";
	echo "data:}\n\n";
	flush();
?>