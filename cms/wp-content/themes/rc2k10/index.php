<?php
get_header();

	if (!function_exists('rc_comments_link')){
		function rc_comments_link( $zero = false, $one = false, $more = false, $css_class = '', $none = false ) {
			global $id, $wpcommentspopupfile, $wpcommentsjavascript, $post;

		    if ( false === $zero ) $zero = __( 'No Comments' );
		    if ( false === $one ) $one = __( '1 Comment' );
		    if ( false === $more ) $more = __( '% Comments' );
		    if ( false === $none ) $none = __( 'Comments Off' );

			$number = get_comments_number( $id );

			if ( 0 == $number && !comments_open() && !pings_open() ) {
				echo '<span' . ((!empty($css_class)) ? ' class="' . $css_class . '"' : '') . '>' . $none . '</span>';
				return;
			}

			if ( post_password_required() ) {
				echo __('Enter your password to view comments');
				return;
			}

			echo apply_filters( 'comments_popup_link_attributes', '' );
			comments_number( $zero, $one, $more, $number );
		}
	}

?>

<body style="background-color:transparent;" onLoad="javascript:buildDiv();" onresize="javascript:onResize();" onresizeend="javascript:onResize();">
	<table id="mainTable" cellpadding="0" cellspacing="0" valign="top">
		<tr style="height:100%">
			
			<td style="height:100%">
				<table border="0" cellpadding="0" cellspacing="0" style="width:inherit;">
					<tr>
						<td id="header" class="header" colspan="5">
							<div class="header" style="float:left; position:relative;">
								<div><img src="images/header_003.jpg" /></div>
								<div class="resume subtitle" style="background-color:#000000">
									&nbsp;<a href="javascript:launchResumeWindow('http://www.robotconscience.com/resume/brett_renfer_resume.pdf')">RESUME</a>
									<span style="font-size:8px;">&nbsp;</span>&nbsp;<a onclick="javascript:openProject('contactform', 'contactColumn')" href="#contactform">CONTACT</a>
									<span style="font-size:8px;">&nbsp;</span>&nbsp;<a onclick="javascript:openProject('post-651')" href="#post-651">ABOUT</a>
								</div>
							</div>
						</td>
					</tr>
					<tr id="things">
						<td id="contactColumn" class="column projectColumn">
							<div class="post project" id="contactform">
								<div class="storycontent" >
									CONTACT ME
									<hr />
									<form id="contact_form" name="contact_form" action="javascript:checkAndSubmit(document.getElementById('contact_form'), 'php/email.php', handleContactHtml, true);" method="post" accept-charset="utf-8">
										<div id="name"><input type="text" name="name" defaultvalue="Name" value="Name" onblur="formLoseFocus(this)" onfocus="formFocus(this)"></input></div>
										<div id="email"><input type="text" name="email" defaultvalue="Email" value="Email" onblur="formLoseFocus(this)" onfocus="formFocus(this)"></input></div>
										<div id="message"><textarea name="message" defaultvalue="Message" value="Message" onblur="formLoseFocus(this)" onfocus="formFocus(this)">Message</textarea></div>
										<hr />
										<div id="submitbutton" style="cursor:pointer;" class="submitbutton" onclick="document.contact_form.submit();"><a class="signinlink" href="#">Submit</a></div>
									</form>
								</div>
							</div>
						</td>
						<td id="projects" class="column projects">
							<div id="header" class="columnHeader projectsHeader">Projects</div>
							<?php $curProject = 0; $curExperiment = 0; $curBlog = 0; ?>
							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
								<?php 
									$valid 	= true;
									$id 	= $post->ID;
									if (in_category("project") && $curProject < 15) :
										$curProject++;
								?>
							<a href="#post-<?php the_ID(); ?>" onclick="javascript:openProject('post-<?php the_ID(); ?>')">
								<div class="post fadedOut" id="<?php the_ID(); ?>" post="post-<?php the_ID(); ?>" onmouseover="fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',1)" onmouseout="fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',0.5)">
									<div class="postParagraph">
										<div class="storytitle">
											<?php echo((the_title('','',false))); ?>
										</div>
										<div class="subtitle"><?php $key = "subtitle"; echo((get_post_meta($id, $key, true))); ?>
										</div>
									</div>
								</div>
							</a>
							<script>
								if (browserName == null) setBrowserName();
								if (browserName == 'msie'){
									window.setTimeout("fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',.5)", 15);
								}
							</script>
							<?php endif; endwhile; else: ?>
							<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
							<?php endif; ?>

							<?php posts_nav_link(' &#8212; ', __('&laquo; Newer Posts'), __('Older Posts &raquo;')); ?>
						</td>
						<td id="projectColumn" class="column projectColumn">
							<div id="spacer" style="height:26px"></div>
							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
								<?php 
									$valid 	= true;
									$id 	= $post->ID;
									$curProject = 0;
									$curExperiment = 0;
									if ((in_category("project") && $curProject < 15) || (in_category("experiment") && $curExperiment < 15)) :
										if (in_category("project")) $curProject++; 
										if (in_category("experiment")) $curExperiment++;
								?>
							<div class="post project" id="post-<?php the_ID(); ?>" pid="<?php the_ID(); ?>">
								<div class="storycontent" >
									<span class="subtitle"><strong>type:</strong>&nbsp;&nbsp;&nbsp;<?php $key = "type"; echo(get_post_meta($id, $key, true)); ?></span><br />
									<span class="subtitle"><strong>tech:</strong>&nbsp;&nbsp;&nbsp;<?php $key = "tech"; echo(get_post_meta($id, $key, true)); ?></span>
									<hr />
									<?php the_content(__('(more...)')); ?>
								</div>

								<div class="feedback">
									<?php wp_link_pages(); ?>
									<br />
									<?php edit_post_link('Edit', '', ' | '); ?>
									<a href="javascript:openComment('comments-<?php the_ID(); ?>')"><?php rc_comments_link(__('View Comments (0)'), __('View Comments (1)'), __('View Comments (%)')); ?></a>
									<hr />
									<div id="comments-<?php the_ID(); ?>" class="rcComments" open="false">
										<?php $withcomments = "1"; comments_template(); // Get wp-comments.php template ?>
									</div>
								</div>
							</div>

							<?php elseif (in_category("about")): ?>
								<div class="post project" id="post-<?php the_ID(); ?>">
									<div class="storycontent" >
										<?php the_content(__('(more...)')); ?>
									</div>

									<div class="feedback">
										<?php wp_link_pages(); ?>
										<br />
										<?php edit_post_link('Edit', '', ' | '); ?>
										<a href="javascript:openComment('comments-<?php the_ID(); ?>')"><?php rc_comments_link(__('View Comments (0)'), __('View Comments (1)'), __('View Comments (%)')); ?></a>
										<hr />
										<div id="comments-<?php the_ID(); ?>" class="rcComments" open="false">
											<?php $withcomments = "1"; comments_template(); // Get wp-comments.php template ?>
										</div>
									</div>
								</div>
							<?php endif; endwhile;  ?>
								
							<?php endif; ?>
							<?php posts_nav_link(' &#8212; ', __('&laquo; Newer Posts'), __('Older Posts &raquo;')); ?>
						</td>
						<td id="experiments" class="column experiments">
							<div id="header" class="columnHeader experimentsHeader">Experiments</div>
							<?php $curExperiment = 0; ?>
							<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
								<?php 
									$valid 	= true;
									$id 	= $post->ID;
									if (in_category("experiment") && $curExperiment < 15) :
										$curExperiment++;
								?>
							<a href="#post-<?php the_ID(); ?>" onclick="javascript:openProject('post-<?php the_ID(); ?>')">
								<div class="post fadedOut" id="<?php the_ID(); ?>" post="post-<?php the_ID(); ?>" onmouseover="fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',1)" onmouseout="fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',0.5)">
									<div class="postParagraph">
										<div class="storytitle">
											<?php echo((the_title('','',false))); ?>
										</div>
										<div class="subtitle"><?php $key = "subtitle"; echo((get_post_meta($id, $key, true))); ?>
										</div>
									</div>
								</div>
							</a>							
							<script>
								if (browserName == null) setBrowserName();
								if (browserName == 'msie'){
									window.setTimeout("fadeTo('<?php the_ID(); ?>','post-<?php the_ID(); ?>',.5)", 15);
								}
							</script>
							<?php endif; endwhile; else: ?>
							<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
							<?php endif; ?>

							<?php posts_nav_link(' &#8212; ', __('&laquo; Newer Posts'), __('Older Posts &raquo;')); ?>
						</td>
						<td id="blog" class="column blog">
							<div id="header" class="columnHeader blogHeader">Blog</div>
							<?php $curBlog = 0; ?>
							<?php if (have_posts()) : while (have_posts() && $curBlog < 15) : the_post(); ?>
								<?php 
									$valid 	= true;
									$id 	= $post->ID;
									if (in_category("blogness")) :
										$curBlog++;
								?>
							<a href="#blogpost-<?php the_ID(); ?>" onclick="javascript:openBlogPost('blogpost-<?php the_ID(); ?>')">
								<div class="post fadedOut blogPost" id="<?php the_ID(); ?>" post="blogpost-<?php the_ID(); ?>" onmouseover="fadeTo('<?php the_ID(); ?>','blogpost-<?php the_ID(); ?>',1)" onmouseout="fadeTo('<?php the_ID(); ?>','blogpost-<?php the_ID(); ?>',0.5)">
									<div class="postParagraph">
										<div class="storytitle">
											<?php echo((the_title('','',false))); ?>
										</div>
										<div class="subtitle">
											<?php $key = "subtitle"; echo((get_post_meta($id, $key, true))); ?>
										</div>
									</div>
								</div>
							</a>							
							<script>
								if (browserName == null) setBrowserName();
								if (browserName == 'msie'){
									window.setTimeout("fadeTo('<?php the_ID(); ?>','blogpost-<?php the_ID(); ?>',.5)", 15);
								}
							</script>
							<div class="post blogentry" id="blogpost-<?php the_ID(); ?>" pid="<?php the_ID(); ?>">
								<div class="storycontent" >
									<hr />
									<?php the_content(__('(more...)')); ?>
								</div>

								<div class="feedback">
									<?php wp_link_pages(); ?>
									<br />
									<?php edit_post_link('Edit', '', ' | '); ?>
									<a href="javascript:openComment('comments-<?php the_ID(); ?>')"><?php rc_comments_link(__('View Comments (0)'), __('View Comments (1)'), __('View Comments (%)')); ?></a>
									<hr />
									<div id="comments-<?php the_ID(); ?>" class="rcComments" open="false">
										<?php $withcomments = "1"; comments_template(); // Get wp-comments.php template ?>
									</div>
								</div>
							</div>
						</div>
							<?php endif; endwhile; else: ?>
							<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
							<?php endif; ?>

							<?php posts_nav_link(' &#8212; ', __('&laquo; Newer Posts'), __('Older Posts &raquo;')); ?>
						</td>
						<td id="therest" class="" style="width:inherit;">
							<div></div>
						</td>
					</tr>		
				</table>
			</td>
		</tr>
	</table>
	<div id="imagecontainer" style="overflow: hidden; position: absolute; width: 100%; height: 100%; z-index: -100; float: left; top: 0px; left: 0px;">
		<img id="bgimage" onload="javascript:onResize()" src="<?php include('php/includes/bg.php');?>"/>
	</div>
	<script>
		var project = window.location.hash;
		
		if (project.indexOf("blog") < 0){
			openProject(project.substr(1));
			fadeTo(project.substr(6),null, 1);
		} else if (project.indexOf('blog') >= 0){
			openBlogPost(project.substr(1));						
		}
		
		window.setTimeout("onResize()", 15);
		
	</script>
<?php get_footer(); ?>
