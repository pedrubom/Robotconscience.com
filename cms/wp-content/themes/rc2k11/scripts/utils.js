/*
MISC UTILS
*/

function getRandomNumberInt(max){
	return Math.floor(Math.random()*max);
}

function getRandomColor(max){
	var r = getRandomNumberInt(max)
	var g = getRandomNumberInt(max);
	var b = getRandomNumberInt(max);
	var css = "rgb("+r+","+g+","+b+")"
	return css;
}

function getRed(cssstring){
	var r = cssstring.substring(4, cssstring.indexOf(','));
	return r;
}
function getGreen(cssstring){
	var g = cssstring.substring(cssstring.indexOf(',')+2);
	g = g.substring(0,g.indexOf(','));
	return g;
}
function getBlue(cssstring){
	var b = cssstring.substring(cssstring.indexOf(',')+2);
	b = b.substring(b.indexOf(',')+2, b.indexOf(')'));
	return b;
}

function setRandomBgColor(id, max)
{
	var el = document.getElementById(id);
	
	if (el.style.getPropertyValue('background-color') != null){
		
		window.clearInterval(el.cInt);
		
		el.r = getRed(el.style.getPropertyValue('background-color'));
		el.g = getGreen(el.style.getPropertyValue('background-color'));
		el.b = getBlue(el.style.getPropertyValue('background-color'));
		el.targetR = getRandomNumberInt(max);
		el.targetG = getRandomNumberInt(max);
		el.targetB = getRandomNumberInt(max);
		el.cInt = window.setInterval(
			function(){
				el.r -= (el.r - el.targetR)/50;
				el.g -= (el.g - el.targetG)/50;
				el.b -= (el.b - el.targetB)/50;
				
				var css = "rgb("+Math.round(el.r)+","+Math.round(el.g)+","+Math.round(el.b)+")"
				el.style.backgroundColor = css;
				
				if (Math.abs(el.targetR - el.r) < 1 && Math.abs(el.targetG - el.g) < 1 && Math.abs(el.targetB - el.b) < 1){
					var css = "rgb("+el.targetR+","+el.targetG+","+el.targetB+")"
					el.style.backgroundColor = css;
					window.clearInterval(el.cInt);
				}
			},1);
		
	} else {
		el.style.backgroundColor = getRandomColor(max);	
	}
}

function resetRandom(style){
	document.style.rancolor = getRandomColor();
}