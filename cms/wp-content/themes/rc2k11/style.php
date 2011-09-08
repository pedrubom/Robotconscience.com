/*
Theme Name: RC 2k11
Theme URI: http://robotconscience.com/
Description: Just some shit. Don't use this.
Author: Brett Renfer
Version: 0.1
License: None
License URI: 
Tags: robotconscience

some random shit
*/

@charset "UTF-8";

<?php

$uh = array();
for ($i = 0; $i < 255; $i++){
	array_push($uh, $i);
}

?>

.rancolor {
	background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
}