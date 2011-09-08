<?php
	$image_dir = 'backgrounds';
	$count = 0;
    $images = array();
	if ($handle = opendir($image_dir)) {
	    while (false !== ($file = readdir($handle))) {
	        if (($file <> ".") && ($file <> "..")) {
	        $images[$count] = $file;
	        $count = $count + 1;
	            }
	    }

	    closedir($handle);
	}
	shuffle($images);
	echo( "backgrounds/" .$images[0]);
?>