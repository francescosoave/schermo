<?php

$val = isset($_GET['val']) ? $_GET['val'] : 0;

$con = Connection();

$sql="UPDATE timer SET Value = '$val', Expired = 0 WHERE Id = 1";

if (!mysqli_query($con, $sql)) {
	die('Error: ' . mysqli_error($con));
	echo mysqli_error($con);
}else echo $val;

function Connection(){

	$DBServer = '127.0.0.1';
	$DBUser   = 'root';
	$DBPass   = "";
	$DBName   = 'schermoatena';
	
	$con = mysqli_connect($DBServer, $DBUser, $DBPass); 
	
	if (!$con) die('Could not connect: ' . mysqli_connect_error());
	else{
		$db= mysqli_select_db($con, $DBName);
		if (!$db) die ("Can't use database : ".mysqli_error());
	}
	mysqli_set_charset($con, "utf8");
	return $con;
}

?>