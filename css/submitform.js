function submitForm (obj, php_src, handler, isPost){
	if (isPost){
		var getstr = "";
	} else {
		var getstr = "?";
	}
	for (var i=0; i<obj.elements.length; i++){
		var value;
		if (!isPost){
			if (obj.elements[i].type == "checkbox" && obj.elements[i].checked){
				value = escape(obj.elements[i].value+":checked");
			} else if (obj.elements[i].type == "checkbox"){
				value = escape(obj.elements[i].value+":unchecked");
			} else if (obj.elements[i].type != "checkbox"){
				value = escape(obj.elements[i].value);
			}
			
		} else {
			if (obj.elements[i].type == "checkbox" && obj.elements[i].checked){
				value = escape(obj.elements[i].value+":checked");
			} else if (obj.elements[i].type == "checkbox"){
				value = escape(obj.elements[i].value+":unchecked");
			} else if (obj.elements[i].type != "checkbox"){
				value = escape(obj.elements[i].value);
			}
		}
		
		getstr += obj.elements[i].name + "=" + value + "&";
		obj.elements[i].disabled = true;
	}
		
	if (isPost){
		request(null, php_src, handler, false, getstr, true);
	} else {
		request(null, php_src, handler, false, getstr);
	}
}

function checkAndSubmit(form, php_src, handler){
	
	var varsComplete = true;
	var error		 = '';
	
	//check form
	for (var i=0; i<form.elements.length; i++){
		var value = form.elements[i].value;
		var dValue = form.elements[i].defaultValue;
		if (value == "" || value == null || value == dValue){
			var formName = form.elements[i].name;
			formName.replace("_", "&nbsp;");
			form.elements[i].value = 'Please enter your '+formName.toLowerCase();
			form.elements[i].className = 'error';
			varsComplete = false;
			break;
		}
	}
	
	if (form.email){
		//check for valid email
		var emailStr = form.email.value;
		var apos	 = emailStr.indexOf("@");
		var dotpos	 = emailStr.lastIndexOf(".");
	
		if (varsComplete && (apos <1 || dotpos < 2)){
			error += 'Invalid Email Address';
			varsComplete = false;
			
			form.email.value = error;
			form.email.className = 'rcerror';
		}
	}
	
	//if ok, submit
	if (varsComplete){
		for (var i=0; i<form.elements.length; i++){
			form.elements[i].disabled = true;
		}
		submitForm(form, php_src, handler, true);
	}
}

function removeError(divname){
	var errorDiv	= document.getElementById('errorDiv');
	if (errorDiv){
		var parentDiv  	= errorDiv.parentNode;
		parentDiv.removeChild(errorDiv);
	}
}