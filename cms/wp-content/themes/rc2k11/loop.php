<?php
// first, get the categories
?>
<?php  
	//wp_list_categories('hide_empty=0');
	/*$defaults = array(
		'show_option_all' => '', 'show_option_none' => '',
		'orderby' => 'id', 'order' => 'ASC',
		'show_last_update' => 0, 'show_count' => 0,
		'hide_empty' => 0, 'child_of' => 0,
		'exclude' => '', 'echo' => 1,
		'selected' => 0, 'hierarchical' => 0,
		'name' => 'cat', 'class' => 'postform',
		'depth' => 0, 'tab_index' => 0
	);

	$defaults['selected'] = ( is_category() ) ? get_query_var( 'cat' ) : 0;

	$r = wp_parse_args( $args, $defaults );
	$r['include_last_update_time'] = $r['show_last_update'];
	extract( $r );

	$tab_index_attribute = '';
	if ( (int) $tab_index > 0 )
		$tab_index_attribute = " tabindex=\"$tab_index\"";

	$categories = get_categories( $r );*/
	
	$categories = get_categories("hide_empty=0");
	
	//loop through + echo out cats
	if ( ! empty( $categories ) ) {
		for ($i =0; $i<sizeof($categories); $i++){
			$slug = $categories[$i]->slug;
			if ($categories[$i]->description != ''){
				//<hr class="postsHr" />
				echo ('<div class="headerBar" id="header_'. $categories[$i]->cat_ID. '">
				' . $categories[$i]->description);
				echo('
			</div>');
				echo('
			<!-- <hr class="" /> -->
			<div id="'. $categories[$i]->cat_ID. '" class="catContainer"></div>
				');
				if ($slug == "twitter"){
					echo("<script>setTimeout(getCategory(" . $categories[$i]->cat_ID.",".$categories[$i]->cat_ID.", 3 ),'. $i*2 .'); setHeader(" . $categories[$i]->cat_ID."); </script>");
				} else if ($slug == "flickr"){
					echo("<script>setTimeout(getFlickr(" . $categories[$i]->cat_ID.", 7 ),'. $i*2 .'); setHeader(" . $categories[$i]->cat_ID.");</script>");
				} else if ($slug == "tumblr"){
					echo("<script>setTimeout(getTumblr(" . $categories[$i]->cat_ID. ",7 ),'. $i*2 .'); setHeader(" . $categories[$i]->cat_ID.");</script>");
				} else if ($slug == "endlessendlessendless"){
					echo("<script>setTimeout(getEEE(" . $categories[$i]->cat_ID. ",4 ),'. $i*2 .'); setHeader(" . $categories[$i]->cat_ID.");</script>");
				} else {		
					echo("<script>setTimeout(getCategory(" . $categories[$i]->cat_ID.",".$categories[$i]->cat_ID.", 7),'. $i*2 .' ); setHeader(" . $categories[$i]->cat_ID.");</script>");
				}
				/*echo('
			<hr id="'. $categories[$i]->cat_ID .'_buffer" class="postsHr" />');*/
				echo('
				');
			}
		}
	}
?>
<div id="projectTemplate" class="postDiv">
	<div id="thumb">
		<div id="thumbImg" class="postImage"></div>
		<div id="thumbText" class="thumbText">+</div>
		<div id="openProject" class="openProject">+</div>
	</div>
	<div id="contentDiv" class="rcPost">
		<div id="close" class="close">CLOSE</div>
		<div id="images" class="rcPostImages">
			<div id="image" class="rcPostImageContainer"></div>
			<div id="prevNext" class="prevNextContainer">
				<div id="prev" class="prev">&lt; PREV</div>
				<div id="next" class="next">NEXT &gt;</div>
			</div>
			<div id="caption" class="caption"></div>
		</div>
		<!-- <div id="titleDiv" >
					<h1 id="title"></h1>
				</div> -->
		<div id="contentDiv">
			<div id="content" class="rcContent"></div>
		</div>
		<!-- <hr /> -->
	</div>
	<!-- <hr /> -->
</div>
<div id="miscContentTemplate" class="postDiv">
	<div id="thumb">
		<div id="thumbImg" class="postImage"></div>
		<div id="thumbText" class="thumbText">+</div>
		<div id="openProject" class="openProject">+</div>
	</div>
	<div id="contentDiv" class="rcPost">
		<div id="close" class="close">CLOSE</div>
		<div id="contentDiv">
			<div id="content" class=""></div>
		</div>
	</div>
	<!-- <hr /> -->
</div>