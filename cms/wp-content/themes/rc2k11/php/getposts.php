<?php
//define('WP_USE_THEMES', false);
include('../../../../wp-includes/functions.php');
include('../../../../wp-includes/query.php');

/** Loads the WordPress Environment and Template */
//require('../../../../wp-blog-header.php');
//get_posts('category=12');

$defaults = array(
	'numberposts' => 5, 'offset' => 0,
	'category' => 0, 'orderby' => 'post_date',
	'order' => 'DESC', 'include' => array(),
	'exclude' => array(), 'meta_key' => '',
	'meta_value' =>'', 'post_type' => 'post',
	'suppress_filters' => true
);

$get_posts = new WP_Query;
$posts = $get_posts->query($defaults);

print_r($posts);
?>
