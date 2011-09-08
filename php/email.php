<?php

$emailto = $_REQUEST["email"];
$name	 = $_REQUEST["name"];
$msg = $_REQUEST["message"];

$sendTo  = "brett@robotconscience.com";
$subject =  'FROM WEBSITE: ' . $name;

$headers = "From: " . $name;
$headers .= "<" . $emailto . ">\r\n";
$headers .= "Reply-To: " . $emailto . "\r\n";
$headers .= "Return-Path: " . $emailto;
$message  = $msg;

mail($sendTo, $subject, $message, $headers);

/*$response = 'Thanks for your ';

if (strlen($response ) > 1){
	$sendTo  = $emailto;
	$subject = 'Response from Robotconscience.com';

	$headers = "From: Brett Renfer";
	$headers .= "<brett@robotconscience.com>\r\n";
	$headers .= "Reply-To: brett@robotconscience.com\r\n";
	$headers .= "Return-Path: brett@robotconscience.com";
	$message  = $response;

	mail($sendTo, $subject, $message, $headers);
}*/
?>
<div id="contactthanks" class="cutoff">
	Thanks! I'll try to get back at you as quickly as I can.
	<hr />
</div>
<form id="contact_form" name="contact_form" action="javascript:checkAndSubmit(document.getElementById('contact_form'), 'php/email.php', handleContactHtml, true);" method="post" accept-charset="utf-8">
	<div id="name"><input type="text" name="name" defaultvalue="Name" value="Name" onblur="formLoseFocus(this)" onfocus="formFocus(this)"></input></div>
	<div id="email"><input type="text" name="email" defaultvalue="Email" value="Email" onblur="formLoseFocus(this)" onfocus="formFocus(this)"></input></div>
	<div id="message"><textarea name="message" defaultvalue="Message" value="Message" onblur="formLoseFocus(this)" onfocus="formFocus(this)">Message</textarea></div>
	<hr />
	<div id="submitbutton" style="cursor:pointer;" class="submitbutton" onclick="document.contact_form.submit();"><a class="signinlink" href="#">Submit</a></div>
</form>