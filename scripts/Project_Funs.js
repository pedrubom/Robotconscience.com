/**
 * Robotconscience v2.0: Frames + things
 *
 * @version		1
 * @license		MIT license
 * @author		Brett Renfer <brett@robotconscience.com>
 * @copyright	Brett Renfer
 */

//vars for main divvs
var launchdiv;
var main_frame;
var to_x;
var back_div;

var loaded = false;

var project_frame = null;
var loading_frame = null;

//current window pos

var windowposx 	= 0;
var windowposy 	= 0;

//random pos chooser

var pos			= 0;

//name of browser (duh!)

var browserName 	= null;
var browserVersion  = null;

//excellent Browser detect class
// from: http://www.quirksmode.org/js/detect.html

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

function setBrowserName(){
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
}

//build init divs

function buildDiv(){
		
	var ua = navigator.userAgent.toLowerCase();
	
	setBrowserName();
	
	browserVersion = BrowserDetect.version;
	
	if (browserName != "firefox" && browserName != "safari"){
		createBrowserAlert();		
	} else if ((browserName == "firefox" && browserVersion.parseFloat < 3.5) || ( browserName == "safari" && browserVersion.parseFloat < 3.1)){
		createBrowserAlert();	 	
	}
		
	//main_frame			 		= window.frames['flash'];
	to_x						= window.innerWidth;
	launchdiv 		 	 		= document.createElement('div');
	launchdiv.id 		 		= 'projects'
	launchdiv.style.position 	= 'absolute';
	launchdiv.style.top			= 0;
	launchdiv.style.display		= 'none';
	launchdiv.style.visibility	= 'hidden';
	
	if (browserName != 'msie'){
		launchdiv.style.left 	= window.innerWidth;
	} else {
		launchdiv.style.left 	= document.body.offsetWidth;
	}
	
	var doc						= null;
	
	if (window.contentDocument){
		doc = contentDocument;
	} else if(window.contentWindow){
		doc = contentWindow.document;
	} else if(window.document) {
		doc = window.document;
	}
	
	doc.body.appendChild(launchdiv);

	back_div = document.createElement('div');
	back_div.id 		 		= 'backDiv'
	back_div.style.display		= 'none';
	back_div.style.visibility	= 'hidden';
	back_div.innerHTML = '<iframe id="back_div" name="back" src="back.html" scrolling="no" frameborder="0" style="width:100%; height:30px;" allowtransparency="false"></iframe>';
	launchdiv.appendChild(back_div);
	loaded = true;
}

//launch rad site div

function launchSite (src, scrollable){
	if (!scrolling){
		backVis = false;
		pos = 0;
	
		if (pos == 0){
			if (browserName != 'msie'){
				to_x					= window.innerWidth;
				to_y					= 0;
				launchdiv.style.left 	= window.innerWidth;
				launchdiv.style.top 	= 0;
			} else {
				to_x					= document.body.offsetWidth;
				to_y					= 0;
				launchdiv.style.left 	= document.body.offsetWidth;
				launchdiv.style.top 	= 0;
			}
		} else {
			if (browserName != 'msie'){
				to_x					= 0;
				to_y					= window.innerHeight;
				launchdiv.style.left 	= 0;
				launchdiv.style.top 	= window.innerHeight;
			} else {
				to_x					= 0;
				to_y					= document.body.offsetHeight;
				launchdiv.style.left 	= 0;
				launchdiv.style.top 	= document.body.offsetHeight;
			}
		}
	
		launchdiv.style.visibility	= 'visible';
		launchdiv.style.display		= 'block';
		launchdiv.style.position 	= 'absolute';
		//launchdiv.style.top			= 0;
		
		project_frame 				= document.createElement('iframe');
		project_frame.id			= 'project';
		project_frame.name			= 'project';
		project_frame.src			= src;
		
		if (!scrollable){
			project_frame.scrolling		= 'no';
		} else {
			project_frame.scrolling		= 'auto';
		}
		project_frame.frameBorder	= 0;
		project_frame.allowtransparency = true;
		project_frame.style.zIndex	= 5;
	
		//alert (project_frame.onLoad());
	
		if (browserName != 'msie'){
			project_frame.width		= window.innerWidth;
			project_frame.height	= window.innerHeight;
		} else {
			project_frame.height	= document.body.offsetHeight;
			project_frame.width		= document.body.offsetWidth;
		}
			
		/*project_frame.onLoad		= new function (){
			scrollWindow (main_frame,to_x,to_y);
		};*/
		
		launchdiv.appendChild(project_frame);
		
		scrollWindow (window,to_x,to_y);
		//scrollWindow (main_frame,to_x,to_y);
		
	}
}

//launch rad site pdf, or open as a file if firefox et al

function launchResumeWindow(src){
	if (browserName == "safari"){
		launchSite (src, false);
	} else {
		window.open(src);
	}
}

function test (src)
{
	alert(src);
}

//trigger for resizing

function onResize(){
	moveDiv();
	resizeBackground();
}

function resizeBackground(){	
	var table = document.getElementById('mainTable');
	var parentDiv = document.getElementById('imagecontainer');
	var image = document.getElementById('bgimage');
	
	if (browserName == null){
		setBrowserName();
	}
	
	if (browserName != 'msie'){
		parentDiv.style.height = table.scrollHeight;
		parentDiv.style.width = table.scrollWidth;
		image.style.height 	= document.body.scrollHeight;
		image.style.width	= "auto";//image.width*(image.height/image.style.height);
		
		if (window.innerWidth > image.width){
			image.style.width 	= document.body.scrollWidth;
			image.style.height	= "auto";//image.height*(image.width/image.style.width);
		}
	} else {
				
		parentDiv.style.height = table.scrollHeight;
		parentDiv.style.width = table.scrollWidth;
		image.style.height 	= document.body.scrollHeight;
		image.style.width	= "auto";//image.width*(image.height/image.style.height);
		
		if (Math.max(document.body.offsetWidth, document.body.clientWidth) > image.width){
			image.style.width 	= document.body.scrollWidth;
			image.style.height	= "auto";//image.height*(image.width/image.style.width);
		}
	}
}

//pos back btn
var backVis = false;

function setBack (){
	if (!backVis){
		backVis = true;
		//set back btn
		back_div.style.height		= '30px';
		//back_div.style.float		= 'left';
		back_div.style.visibility 	= 'visible';
		back_div.style.display		= 'block';
		onResize();
	} else {
		backVis = false;
		launchdiv.style.visibility	= 'hidden';
		launchdiv.style.display		= 'none';
		project_frame.parentNode.removeChild(project_frame);
	}
}

//scroll funs

function easeOut (t, b, c, d){
	//alert(b+":"+c);
	return c*t/d + b;
}

var scrolling 	= false;
var scrollTime 	= 20;

function scrollWindow (el,_x,_y){
	scrolling = true;
	window.clearInterval(el.sInt);
	el.time = 0;
	el.sInt = window.setInterval (
		function(){
			var tox = easeDist(windowposx,_x);
			var toy = easeDist(windowposy,_y);
			
			el.time++;
			
			windowposx = tox;
			windowposy = toy;
			
			el.scrollTo(tox,toy);
						
			if (Math.abs(windowposx - _x) < 1 && Math.abs(windowposy - _y) < 1 || el.time > scrollTime){
				el.scrollTo(_x,_y);
				windowposx = _x;
				windowposy = _y;
				window.clearInterval(el.sInt);
				scrolling = false;
				setBack();
			}
		}, 1);
}

function easeDist(beg,end){
	var dist = (beg-((beg-end)/4));
	return (dist);
}

//back / pos funs
function goBack (){
	if (!scrolling){
		if (pos == 0){
			if (browserName != 'msie'){
				launchdiv.style.left 	= window.innerWidth;
			} else {
				launchdiv.style.left 	= max(document.body.offsetWidth, document.body.clientWidth);
			}
		} else {
			if (browserName != 'msie'){
				launchdiv.style.top 	= window.innerHeight;
			} else {
				launchdiv.style.top 	= document.body.offsetHeight;
			}
		}
		//launchdiv.style.position	= 'relative';
		//launchdiv.float				= 'left';
		scrollWindow(window,0,0);
		back_div.style.visibility	= 'hidden';
		back_div.style.display		= 'none';
	}
}

//resize

function moveDiv (){
	if (!scrolling && loaded){
		//back_div.style.width		= '125px';
		if (back_div) back_div.style.height		= '30px';
		
		// if (browserName != 'msie'){
		// 			back_div.style.left			= (window.innerWidth) - 125;
		// 			back_div.style.top			= 0;
		// 		} else {
		// 			back_div.style.left			= (document.body.offsetWidth) - 145;
		// 			back_div.style.top			= 0;
		// 		}
		
		var table = document.getElementById('mainTable');
		
		if (pos == 0){
			if (browserName != 'msie'){
				launchdiv.style.left 	= table.scrollWidth;
				if (windowposx != 0){
					window.scrollTo (window.innerWidth, 0);
				}
			} else {
				launchdiv.style.left 	= table.scrollWidth;
				if (windowposx != 0){
					window.scrollTo (document.body.offsetWidth, 0);
				}
			}
		} else {
			if (browserName != 'msie'){
				launchdiv.style.left 	= 0;
				launchdiv.style.top 	= window.innerHeight;
				if (windowposy != 0){
					window.scrollTo (0, window.innerHeight);
				}
			} else {
				launchdiv.style.left 	= 0;
				launchdiv.style.top 	= document.body.offsetHeight;
				if (windowposy != 0){
					window.scrollTo (0, document.body.offsetHeight);
				}
			}
		}
		
		launchdiv.style.width 		= '100%';
		launchdiv.style.height 		= '100%';
		//launchdiv.style.display		= 'none';
		//launchdiv.style.visibility	= 'hidden';
		
		if (project_frame){
			project_frame.width = '100%';
			project_frame.height = '100%';	
		}
		
		var t = window.setTimeout('moveDiv()', 500);
	}
}

/*************************************************************************************
	MAIN PROJECT FUNCTIONS
*************************************************************************************/

	var currentProject = null;
	var currentBlog = null;
	var currentParent = null;

	function fadeTo (element, post, fadeNum, force){
		var projectDiv = document.getElementById(post);
		if ((projectDiv != currentProject || force) && ( force || post == null || projectDiv.getAttribute("open") == 'false' || projectDiv.getAttribute("open") == null)){
			var el = $(element);
			if (typeof el.set == 'function'){
				el.set('tween', {duration: '250'});
				el.tween('opacity', fadeNum);//fade(fadeNum);
			} else {
				var el = document.getElementById(element);
				if (el != null)	el.style.opacity = fadeNum;
			}
		}
	}
		
	function openProject (id, parentColumn){		
		var projectDiv = document.getElementById(id);
		if (!parentColumn) parentColumn = "projectColumn";
		
		if (currentBlog != null) closeCurrentBlogPost();
		if (currentProject != projectDiv){
			projectDiv.style.display = "block";
			projectDiv.style.visibility = "visible";
			projectDiv.setAttribute("open", "true");
			
			showDiv(parentColumn);
			
			if (currentProject != null){
				currentProject.style.display = "none";
				currentProject.style.visibility = "hidden";
				currentProject.setAttribute("open", "false");
				if (currentProject.getAttribute("pid") != null) fadeTo(currentProject.getAttribute("pid"), null, 0.5);
				
				if (currentParent != parentColumn) hideDiv(currentParent);
				
			}
			currentProject = projectDiv;
			currentParent = parentColumn;
			resizeBackground();
		} else {
			if (currentProject != null) closeCurrentProject(parentColumn);
			resizeBackground();
			window.setTimeout(function(){ window.location.hash = "#";}, 10);
		}
	}
	
	function openBlogPost(id, closing) {		
		if (currentProject != null) closeCurrentProject();
		
		var div = document.getElementById(id);
		if (currentBlog != null && div != currentBlog) closeCurrentBlogPost();
		
		if (div.getAttribute("open") == 'false' || div.getAttribute("open") == null){
			showDiv(id);
			div.setAttribute("open", "true");
			currentBlog = div;
		} else {
			hideDiv(id);
			div.setAttribute("open", "false");
			if (!closing) window.setTimeout(function(){ window.location.hash = "# ";}, 10);	
			fadeTo( div.getAttribute("pid"), null, 0.5, true);		
			if (currentBlog != null && div == currentBlog) currentBlog = null;
		}
		resizeBackground();
	}
	
	function closeCurrentBlogPost (){
		var id = currentBlog.id;
		currentBlog = null;
		openBlogPost(id, true);
	}
	
	function closeCurrentProject (parentColumn){
		if (!parentColumn) parentColumn = "projectColumn";
		currentProject.style.display = "none";
		currentProject.style.visibility = "hidden";
		currentProject.setAttribute("open", "false");
		if (currentProject.getAttribute("pid") != null) fadeTo(currentProject.getAttribute("pid"), null, 0.5, true);
		currentProject = null;
		
		hideDiv(parentColumn);
		resizeBackground();
		window.setTimeout(function(){ window.location.hash = "# ";}, 10);
		
		currentProject = null;
	}
	
	function openComment(id){
		;
		var div = document.getElementById(id);
		if (div.getAttribute("open") == 'false'){
			showDiv(id);
			div.setAttribute("open", "true")
		} else {
			hideDiv(id);
			div.setAttribute("open", "false")
		}
		resizeBackground();
	}
	
	function showDiv (id){
		var div = document.getElementById(id);
		div.style.display = "block";
		div.style.visibility = "visible";
	}
	
	function hideDiv (id){
		var div = document.getElementById(id);
		div.style.display = "none";
		div.style.visibility = "hidden";
	}

/*************************************************************************************
	CONTACT FORM: AJAX STUFFS
*************************************************************************************/

	function handleContactHtml(html){
		var resultDiv 		= document.getElementById('contact_form');
		var resultParent	= resultDiv.parentNode;
		
		resultParent.removeChild(resultDiv);
		resultParent.innerHTML += html;
		
		window.setTimeout('shrinkDiv("contactthanks")', 1500);
	}
	
	function formFocus (div)
	{	
		if (div.value.length <= 0 || div.value == div.defaultValue || div.className == "rcerror" || div.value.indexOf("Please enter") >=0) div.value = "";
		div.className = '';
	};
	
	function formLoseFocus (div)
	{
		if (div.value.length <= 0) div.value = div.defaultValue;
	}

/*************************************************************************************
	SHRINK + GROW DIVS
*************************************************************************************/

	function shrinkDiv(id)
	{
		var el =$(id);
		el.set('tween', {duration: '250'});
		el.addEvent('complete', function(){
			hideDiv(id);
		})
		el.tween('height', 0);
	}
	
/*************************************************************************************
	I DON'T LIKE YOUR BROWSER
*************************************************************************************/

	function createBrowserAlert(){
		
	}
	
