//basic AJAX jams

function getXMLObject(){
	var xmlHttp;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	 }
	catch (e)
	{
		// Internet Explorer
		 try
	    {
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
	    {
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	return xmlHttp;
}

function request(val, php_src, handler, isXML, params, isPost)
{	
	var xmlHttp = getXMLObject();
	if (xmlHttp==null)
	{
		alert ("Your browser does not support AJAX!");
		return;
	}
	xmlHttp.onreadystatechange=function(){
		
		//state = ready 
		if (xmlHttp.readyState == 4){
			if (handler){
				if (!isXML){
					handler(xmlHttp.responseText);
				} else {
					handler(xmlHttp.responseXML);
				}
			}
			xmlHttp.close;
		} 
	}
	
	//make request
	var url	= php_src;
	if (!params && !isPost){
		url += '?r='+val;
	} else if (isPost && !params){
		params = 'r='+val;
	} else if (!isPost){
		url += params;
	}
	
	if (!isPost){
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null);
	} else {		
		xmlHttp.open("POST", url, true);
		
		//alert("OPN");
		
		//Send the proper header information along with the request
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.setRequestHeader("Content-length", params.length);
		xmlHttp.setRequestHeader("Connection", "close");
		
		xmlHttp.send(params);
	}
}