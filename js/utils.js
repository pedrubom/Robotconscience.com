//utils
function getQueryString(key)
{
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null)
		return '';
	else
		return qs[1];
}

function removeElementById(id) {
	var element = document.getElementById(id);
	if (element) element.parentNode.removeChild(element);
	else console.log("that element doesn't exist, dummy")
}

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.gp;
    }
}
function getScrollLeft(){
    if(typeof pageXOffset!= 'undefined'){
        //most browsers
        return pageXOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientWidth)? D: B;
        return D.scrollLeft;
    }
}

function scrollWindowTo(x, y)
{
	if (window.scrollInterval) window.clearInterval(window.scrollInterval);
	window.targetX = x;
	window.targetY = y;
	window.curX    = getScrollLeft();
	window.curY	   = getScrollTop();
	window.scrollCount    = 0;
	window.scrollInterval = window.setInterval(updateScroll, 3);
}

function updateScroll(){
	window.scrollCount++;
	window.curX -= (window.curX - window.targetX)/10;
	window.curY -= (window.curY - window.targetY)/10;
	if (Math.abs(window.targetX - window.curX) < 1 && Math.abs(window.targetY - window.curY) < 1 || window.scrollCount > 30){
		window.scrollTo(Math.floor(window.targetX), Math.floor(window.targetY));
		window.clearInterval(window.scrollInterval);
	} else {
		window.scrollTo(Math.floor(window.curX), Math.floor(window.curY));
	}
}