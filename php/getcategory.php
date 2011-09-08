<?php
define('WP_USE_THEMES', false);

/** Loads the WordPress Environment and Template */
if ( !isset($wp_did_header) ) {

	$wp_did_header = true;

	require_once( '../cms/wp-load.php' );

	wp();
}
//define('WP_USE_THEMES', false);
include('../../cms/wp-includes/functions.php');
include('../../cms/wp-includes/query.php');

/** Loads the WordPress Environment and Template */
//require('../../../../wp-blog-header.php');
//get_posts('category=12');

$defaults = array(
	'numberposts' => 5, 'offset' => 0,
	'category' => 12, 'orderby' => 'post_date',
	'order' => 'DESC', 'include' => array(),
	'exclude' => array(), 'meta_key' => '',
	'meta_value' =>'', 'post_type' => 'post',
	'suppress_filters' => true
);

$get_posts = new WP_Query;
$posts = $get_posts->query($defaults);

print_r($posts);
/*
	$cat = $_REQUEST['category'];
	
	$args = array(
		'offset' => $offset,
		'order' => 'ASC',
		'orderby' => 'title',
		'posts_per_page' => $per_page,
		'post_type' => $post_type_name,
		'suppress_filters' => true,
		'update_post_term_cache' => false,
		'update_post_meta_cache' => false
	);

	if ( isset( $post_type['args']->_default_query ) )
		$args = array_merge($args, (array) $post_type['args']->_default_query );

	// @todo transient caching of these results with proper invalidation on updating of a post of this type
	$get_posts = new WP_Query;
	$posts = $get_posts->query( $args );
	if ( ! $get_posts->post_count ) {
		echo '<p>' . __( 'No items.' ) . '</p>';
		return;
	}
*/
?>