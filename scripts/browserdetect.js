var browserName;
var ua = navigator.userAgent.toLowerCase();

if ( ua.indexOf( "opera" ) != -1 ) {
	browserName = "opera";
} else if ( ua.indexOf( "msie" ) != -1 ) {
	browserName = "msie";
} else if ( ua.indexOf( "safari" ) != -1 ) {
	browserName = "safari";
} else if ( ua.indexOf( "mozilla" ) != -1 ) {
	if ( ua.indexOf( "firefox" ) != -1 ) {
		browserName = "firefox";
	} else {
		browserName = "mozilla";
	}
};