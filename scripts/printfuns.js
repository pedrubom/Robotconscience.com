function expandImage (divName, image){
	var div = document.getElementById(divName);
	//init + normal expand
	if (!div.expanded || div.expanded == 'false'){
		div.expanded = 'true';
		div.oldH = image.height;
		
		image.height = Math.floor(div.oldH/2);
	} else {
		div.expanded = 'false';
		image.height = '50%';
	}
}