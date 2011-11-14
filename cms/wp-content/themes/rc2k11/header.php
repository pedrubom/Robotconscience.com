<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package Robotconscience
 * @subpackage RC2k11
 * @since RC2k11 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;
	
	wp_title( '|', true, 'right' );

	// Add the blog name.
	bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );

	?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="stylesheet" type="text/css" media="all" href="<?php echo(get_bloginfo('stylesheet_directory')); ?>/style.php" />
<link rel="stylesheet" type="text/css" media="all" href="<?php echo(get_bloginfo('stylesheet_directory')); ?>/style.php" />
<style>
	<?php
	$uh = array();
	for ($i = 0; $i < 150; $i++){ array_push($uh, $i); }
	?>

	.rancolor1 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
	.rancolor2 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
	.rancolor3 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
	.rancolor4 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
	.rancolor5 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
	.rancolor6 {
		background-color: rgb(<?php echo($uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)] . ', ' . $uh[array_rand($uh)]);?>);
	}
</style>
<script src="<?php echo(get_bloginfo('stylesheet_directory')); ?>/scripts/utils.js" language="javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" language="javascript"></script>
<script src="js/key.js" language="javascript"></script>
<script src="js/utils.js" language="javascript"></script>
<script src="js/main.js" language="javascript"></script>
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php
	
	//some cheater vars
	$bUseHeaderImages = false;
	
	//counter and stuff
	$currentPosition = 'INTERACTION DESIGNER';
	$currentEmployer = 'LAB AT ROCKWELL GROUP';
	$currentEmployerUrl = 'http://www.rockwellgroup.com/lab';
	
	date_default_timezone_set('EST');
    $dateSrc = '2008-06-02 9:00 EST';

	$since 		= mktime (9, 0, 0, 6, 2, 2008); 
	$now		= time();
	$diff		= $now - $since;

	/* We add some JavaScript to pages with the comment form
	 * to support sites with threaded comments (when in use).
	 */
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );

	/* Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>

<body <?php body_class(); ?>>
<div id="wrapper" class="">
	<div id="header">
		<div id="masthead">
			<div id="branding" role="banner">
				<div id="rcheader">
					<div class="">Brett Renfer is currently a(n)</div><br />
					<div id="c-pos" class="blank bigblank rancolor1" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);"><?php echo($currentPosition); ?></div>
					<div class="textDiv">&nbsp;at&nbsp;</div>
					<div id="c-title" class="blank bigblank rancolor2" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);">
						<a href="<?php echo($currentEmployerUrl); ?>"><?php echo($currentEmployer); ?></a>
					</div>
					<div class="textDiv" style="float:none">,</div><br />
					<div class="textDiv" style="float:none">where he has been working for&nbsp;</div><br />       
					<div id="c-yr" class="blank smallblank rancolor3" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);" style:"float:none">XX</div>
					<div class="textDiv">&nbsp;years,&nbsp;</div>
					<div id="c-m" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-m', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);"class="blank smallblank rancolor3">XX</div>
					<div class="textDiv">&nbsp;months,&nbsp;</div>
					<div id="c-d" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-m', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);"class="blank smallblank rancolor3">XX</div>
					<div class="textDiv">&nbsp;days,&nbsp;</div>
					<div id="c-hr" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-m', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);"class="blank smallblank rancolor4">XX</div>
					<div class="textDiv">&nbsp;hours,</div>
					<br /><br /><br />
					<div class="textDiv">and&nbsp;</div>
					<div id="c-min" onmouseover="setRandomBgColor('c-pos', 150); setRandomBgColor('c-title', 150); setRandomBgColor('c-yr', 150); setRandomBgColor('c-m', 150); setRandomBgColor('c-d', 150); setRandomBgColor('c-hr', 150); setRandomBgColor('c-min', 150);"class="blank smallblank rancolor5">XX</div>
					<div class="textDiv" style="padding-bottom:12px">&nbsp;minutes.*</div><br /><br />					
				</div>
				<?php
					if ($bUseHeaderImages):
					// Check if this is a post or page, if it has a thumbnail, and if it's a big one
					if ( is_singular() && current_theme_supports( 'post-thumbnails' ) &&
							has_post_thumbnail( $post->ID ) &&
							( /* $src, $width, $height */ $image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'post-thumbnail' ) ) &&
							$image[1] >= HEADER_IMAGE_WIDTH ) :
						// Houston, we have a new header image!
						echo get_the_post_thumbnail( $post->ID );
					elseif ( get_header_image() ) : ?>
						<img src="<?php header_image(); ?>" width="<?php echo HEADER_IMAGE_WIDTH; ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" alt="" />
					<?php endif; ?>
					<?php endif; ?>
			</div><!-- #branding -->

			<div id="access" role="navigation" style="margin-top:12px">
			  <?php /*  Allow screen readers / text browsers to skip the navigation menu and get right to the good stuff */ ?>
				<div class="skip-link screen-reader-text"><a href="#content" title="<?php esc_attr_e( 'Skip to content', 'twentyten' ); ?>"><?php _e( 'Skip to content', 'twentyten' ); ?></a></div>
				<?php /* Our navigation menu.  If one isn't filled out, wp_nav_menu falls back to wp_page_menu.  The menu assiged to the primary position is the one used.  If none is assigned, the menu with the lowest ID is used.  */ ?>
				<div class="basicRC">
				<?php wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) ); ?>
				</div>
			</div><!-- #access -->
		</div><!-- #masthead -->
	</div><!-- #header -->

	<div id="main" >
