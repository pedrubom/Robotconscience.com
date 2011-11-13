function timeSince(date) {
	var sinceObj = {};
	
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
		sinceObj['years'] = interval;
    }
	seconds -= interval*31536000;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
		sinceObj['months'] = interval;
    }
	seconds -= interval*2592000;
	
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
		sinceObj['days'] = interval;
    }
	seconds -= interval*86400;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
		sinceObj['hours'] = interval;
    }
	seconds -= interval*3600;
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
		sinceObj['minutes'] = interval;
    }
	return sinceObj;
}

function updateTime(){
	//2008-06-02 9:00
	var then = new Date(2008,6,2,9,0,0,0);
	var time = timeSince(then);
	
	document.getElementById("c-yr").innerHTML 	= time['years'];
	document.getElementById("c-m").innerHTML 	= time['months'];
	document.getElementById("c-d").innerHTML	= time['days'];
	document.getElementById("c-hr").innerHTML	= time['hours'];
	document.getElementById("c-min").innerHTML	= time['minutes'];
}

//globals
var projectTemplate, miscContentTemplate;
var projectDivs	= {};
var divs = [];
var contentIndicides = {};
var currentOpenProject = null;
var hash = "";

$(document).ready(function(){
	//setup project templat
	projectTemplate = document.getElementById('projectTemplate');
	miscContentTemplate = document.getElementById('miscContentTemplate');
	//setup time
	updateTime();
	
	//get hash if there is one
	hash = (window.location.hash).substr(1);
	
	setInterval(updateTime, 30000);
});

// scroll
function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
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
	window.scrollInterval = window.setInterval(updateScroll, 3);
}

function updateScroll(){
	window.curX -= (window.curX - window.targetX)/25;
	window.curY -= (window.curY - window.targetY)/25;
	if (Math.abs(window.targetX - window.curX) < 1 && Math.abs(window.targetY - window.curY) < 1){
		window.scrollTo(Math.floor(window.targetX), Math.floor(window.targetY));
		window.clearInterval(window.scrollInterval);
	} else {
		window.scrollTo(Math.floor(window.curX), Math.floor(window.curY));
	}
}

// build thumb div
function newProject( id, parent, catId, slug )
{
	var newDiv = projectTemplate.cloneNode(true);
	newDiv.id = id;
	newDiv.slug = slug;
	
	var allMyChildren = newDiv.getElementsByTagName('*');
	
	for (var i=0; i<allMyChildren.length; i++){
		allMyChildren[i].id += "_"+id; 
	}
	parent.appendChild(newDiv);
	
	projectDivs[catId] 			= projectDivs[catId] || {}; 
	projectDivs[catId][id]  	= {}
	projectDivs[catId][id].div	= newDiv;
	
	//thumbnail
	newDiv.thumb			= document.getElementById("thumb_"+id);
	newDiv.thumbImg 		= document.getElementById("thumbImg_"+id);
	newDiv.thumbText 		= document.getElementById("thumbText_"+id);
	newDiv.open				= document.getElementById("openProject_"+id);
	newDiv.thumb.onmouseover = function(){
		if (newDiv.thumbText.style.opacity <= 0){
			newDiv.thumbText.style.opacity = .5;
		}
		//newDiv.open.style.opacity = 1;
	}
	newDiv.thumbText.onmouseup 	 = newDiv.thumb.onmouseup = function(){
		openProject(newDiv);
	}
	newDiv.thumbText.onmouseover = function(){
		newDiv.thumbText.style.opacity = .9;
	}
	newDiv.thumb.onmouseout = function(){
		newDiv.thumbText.style.opacity = 0.0;
		//newDiv.open.style.opacity = 0.0;
	}
	newDiv.contentDiv		= document.getElementById("contentDiv_"+id);
	
	//image container
	newDiv.imageContParent	= document.getElementById("images_"+id);
	newDiv.imageContainer	= document.getElementById("image_"+id);
	newDiv.prevImage		= document.getElementById("prev_"+id);
	newDiv.nextImage		= document.getElementById("next_"+id);
	
	newDiv.imageContParent.onmouseover = function(){
		if (newDiv.prevImage.style.opacity <= 0){
			newDiv.prevImage.style.opacity = .5;
		}
		if (newDiv.nextImage.style.opacity <= 0){
			newDiv.nextImage.style.opacity = .5;
		}
	}
	newDiv.imageContParent.onmouseout = function(){
		newDiv.nextImage.style.opacity = 0.0;
		newDiv.prevImage.style.opacity = 0.0;
	}
	newDiv.prevImage.onmouseover = function(){
		newDiv.prevImage.style.opacity = 1.0;
	}
	newDiv.prevImage.onmouseout = function(){
		newDiv.prevImage.style.opacity = 0.5;
	}
	newDiv.nextImage.onmouseover = function(){
		newDiv.nextImage.style.opacity = 1.0;
	}
	newDiv.nextImage.onmouseout = function(){
		newDiv.nextImage.style.opacity = 0.5;
	}
	newDiv.prevImage.onmouseup			= function(){
		newDiv.currentImage--;
		if (newDiv.currentImage < 0){
			newDiv.currentImage = newDiv.totalImages-1;
		}
		newDiv.imageContainer.style.left = -newDiv.images[newDiv.currentImage].offsetLeft+"px";//clientLeft;
	}
	newDiv.nextImage.onmouseup			= function(){
		newDiv.currentImage++;
		if (newDiv.currentImage >= newDiv.totalImages){
			newDiv.currentImage = 0;
		}
		newDiv.imageContainer.style.left = -newDiv.images[newDiv.currentImage].offsetLeft+"px";//clientLeft;
	}
	
	
	//newDiv.titleContainer	= document.getElementById("title_"+id);
	newDiv.contentContainer	= document.getElementById("content_"+id);
	
	return newDiv;
}

// load project page
function openProject( projectDiv )
{
	if (currentOpenProject != null) closeProject(currentOpenProject);
	projectDiv.thumb.style.visibility = "hidden";
	projectDiv.thumb.style.display = "none";
	projectDiv.contentDiv.style.visibility = "visible";
	projectDiv.contentDiv.style.display = "block";
	projectDiv.className = "openedPost";
	
	projectDiv.contentContainer.innerHTML = projectDiv.contentHTML;
	projectDiv.imageContainer.width = 0;
	var len = projectDiv.imageData.length;
	projectDiv.images = [];
	if (len > 1){
		projectDiv.prevImage.style.visibility = projectDiv.nextImage.style.visibility = "visible";
	} else if (len == 0){
		projectDiv.imageContParent.style.visibility = "hidden";
	}
	projectDiv.currentImage = 0;
	projectDiv.totalImages	= len;
	
	if (len > 0){
		for (var j=0; j<len; j++){
			var img = document.createElement("div");
			try {
				var obj = eval(projectDiv.imageData[j]);
				img.innerHTML = obj.src;
				img.className = "rcPostImage";
				projectDiv.imageContainer.appendChild(img);
				projectDiv.imageContainer.width += img.width+20;
				projectDiv.images[projectDiv.images.length] = img;
			}
			catch(exc){
				console.log('error with eval '+exc);
			}
		}
	} else {
		removeElementById("images_"+projectDiv.id);
	}
	
	currentOpenProject = projectDiv;
	scrollWindowTo(0, projectDiv.offsetTop);
	window.location.hash=projectDiv.slug;
}

// build 3rd party content divs
function newContent( id, parent, catId, slug, content){
	var newDiv = miscContentTemplate.cloneNode(true);
	newDiv.id = id;
	newDiv.slug = slug;
	
	var allMyChildren = newDiv.getElementsByTagName('*');
	
	for (var i=0; i<allMyChildren.length; i++){
		allMyChildren[i].id += "_"+id; 
	}
	parent.appendChild(newDiv);
	
	projectDivs[catId]		= projectDivs[catId] || {};
	projectDivs[catId][id]  = {}
	projectDivs[catId][id].div	= newDiv;
	
	//thumbnail
	newDiv.thumb			= document.getElementById("thumb_"+id);
	newDiv.thumbImg 		= document.getElementById("thumbImg_"+id);
	newDiv.thumbText 		= document.getElementById("thumbText_"+id);
	newDiv.open				= document.getElementById("openProject_"+id);
	newDiv.thumb.onmouseover = function(){
		if (newDiv.thumbText.style.opacity <= 0){
			newDiv.thumbText.style.opacity = .5;
		}
		//newDiv.open.style.opacity = 1;
	}
	newDiv.thumbText.onmouseup 	 = newDiv.thumb.onmouseup = function(){
		if (currentOpenProject != null) closeProject(currentOpenProject);
		newDiv.thumb.style.visibility = "hidden";
		newDiv.thumb.style.display = "none";
		newDiv.contentContainer.innerHTML = newDiv.content;
		newDiv.contentDiv.style.visibility = "visible";
		newDiv.contentDiv.style.display = "block";
		newDiv.className = "openedPost";
		currentOpenProject = newDiv;
		scrollWindowTo(0, newDiv.offsetTop);
		window.location.hash=newDiv.slug;
	}
	newDiv.thumbText.onmouseover = function(){
		newDiv.thumbText.style.opacity = .9;
	}
	newDiv.thumb.onmouseout = function(){
		newDiv.thumbText.style.opacity = 0.0;
		//newDiv.open.style.opacity = 0.0;
	}
	newDiv.contentDiv		= document.getElementById("contentDiv_"+id);
	newDiv.contentContainer	= document.getElementById("content_"+id);
	newDiv.content = content;
	
	return newDiv;
}

function closeProject( project )
{
	if(project.contentContainer) project.contentContainer.innerHTML = "";
	if(project.imageContainer) project.imageContainer.innerHTML = "";
	project.thumb.style.visibility = "visible";
	project.thumb.style.display = "block";
	project.contentDiv.style.visibility = "hidden";
	project.contentDiv.style.display = "none";
	project.className = "postDiv";
}

function setHeader(catId )
{
	//randomize header colors
	var header = document.getElementById("header_"+catId);
	//header.style.color = 'rgba('+Math.floor(Math.random()*60)+','+Math.floor(Math.random()*60)+','+Math.floor(Math.random()*60)+',.6)';
}

function getCategory( divId, catId, numPosts )
{
	divs[catId] = document.getElementById(divId);
	
	var numToRequest = numPosts;
	
	if (contentIndicides[catId]){
		contentIndicides[catId].offset = contentIndicides[catId].number;
		contentIndicides[catId].number += numPosts;
	} else {
		contentIndicides[catId] = {};
		contentIndicides[catId].number = numPosts;
		contentIndicides[catId].offset = 0;
	}
	
	numToRequest = contentIndicides[catId].number;
	
	$.ajax({
	  url: "?json=get_category_posts&id="+catId+"&count="+numToRequest+"&custom_fields=image",
	  success: onCategoryLoaded,
	  dataType: "json"
	});
}

function onCategoryLoaded( json )
{
	var id, slug, numPosts;
	if (json.category){
		id = json.category.id;
		slug = json.category.slug;
		numPosts 	= json.category.post_count;
	} else {
		id = '4';
		slug = "eee";
		numPosts 	= json.count;
	}
	
	var posts 		= json.posts;
	
	if (divs[id] != null){
		//divs[id].innerHTML = "";
	} else {
		console.log("bad category, buddy");
		return;
	}
	divs[id].numposts = json.count;
	
	var bTwitterDone = false;
	
	var start = contentIndicides[id].offset;
	var end	  = Math.min(contentIndicides[id].number, posts.length);
	
	for (var i=start; i<end; i++)
	{
		var status = posts[i].status;
		
		if (status == "publish"){
			if (slug != 'twitter' && slug != 'flickr' && slug != 'tumblr' ){
				console.log(posts[i].excerpt);
				if (posts[i].excerpt != 'blank'){
					var p_id 	= posts[i].id;
					var url  	= posts[i].url;
					var title	= posts[i].title_plain;
					var contentHTML = posts[i].content;
					var images = [];
					if (posts[i].custom_fields){
						images = posts[i].custom_fields.image || [];
					}
					//var thumbImg	= posts[i].excerpt.

					var newDiv 		= newProject(p_id, divs[id], id, posts[i].slug);
					newDiv.url  	= url;
					newDiv.thumbImg.innerHTML  		= posts[i].excerpt;
					//newDiv.thumbText.innerHTML 		= title;
					//newDiv.titleContainer.innerHTML 	= title;
					newDiv.contentHTML 	= contentHTML;
					newDiv.imageData		= images;
					divs[id].appendChild(newDiv);
					if (hash == posts[i].slug){
						openProject(newDiv);
					}
				}
			} else if (slug == "twitter"){
				if (!bTwitterDone){
					var p_id 	= posts[i].id;
					var url  	= posts[i].url;
					var title	= posts[i].title_plain;
					var contentHTML = posts[i].content;
					//var thumbImg	= posts[i].excerpt.
					var contentStripped = contentHTML.substr(contentHTML.indexOf("<p>")+3, contentHTML.indexOf("</p>")-3);
					var contentNoHTML	= stripHTML(contentHTML);
					var atIndex = contentNoHTML.indexOf('@');
					
					if (atIndex > 0 || atIndex == -1){
						bTwitterDone = true;
						var div = document.createElement("div");
						div.id = p_id;
						div.className = "twitter";
						div.innerHTML = "<p>'"+contentStripped+"'</p>";
						divs[id].appendChild(div);
					}

				}
			} else if (slug == "tumblr"){
			} else {
				var p_id 	= posts[i].id;
				var url  	= posts[i].url;
				var title	= posts[i].title_plain;
				var contentHTML = posts[i].content;
				var excerpt	= '<div id="'+p_id+'_thumb" class="postImage">'+contentHTML+'</div>';
				
				var newDiv 	= newContent( p_id, divs[id], id, posts[i].slug, contentHTML);
				newDiv.thumbImg.content = excerpt;
			}
		}
	}
	if (numPosts - end > 0){
		createMoreButton(divs[id], divs[id].id, id, end-start+1);
	} else if (numPosts <= 0){
		removeElementById(id);
		document.getElementById('header_'+id).style.border='0px none';
	}
}

function createMoreButton( div, divId, catId, numPosts ){
	var moreDiv = document.createElement("div");
	moreDiv.className 	= "moreButton";
	moreDiv.id			= divId+"_more";
	moreDiv.innerHTML 	= "MORE";
	moreDiv.onclick		= function(){
		removeElementById(divId+"_more");
		getCategory( divId, catId, numPosts );
	};
	div.appendChild(moreDiv);
}

function removeElementById(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}

function stripHTML(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

// TUMBLR

function getTumblr( divId, number )
{	
	if (contentIndicides["tumblr"]){
		contentIndicides["tumblr"].offset += contentIndicides["tumblr"].number;
		contentIndicides["tumblr"].number += number;
	} else {
		contentIndicides["tumblr"] = {};
		contentIndicides["tumblr"].number = number;
		contentIndicides["tumblr"].offset = 0;
	}
	
	divs["tumblr"] = document.getElementById(divId);
	$.ajax({
	  url: "http://robotconscience.tumblr.com/api/read/json?callback=onTumblrLoaded&start="+contentIndicides["tumblr"].offset+"&num="+number,
	  success:onTumblrLoaded,
	  dataType: "jsonp"
	});
}

function onTumblrLoaded( json ){
	var posts 	 = json.posts;
	var numPosts = json["posts-total"];
	
	var start = 0;
	var end	  = posts.length;
	
	for (var i=start; i<end; i++){
		var p_id 	= posts[i].id;
		var url  	= posts[i].url;
		var title	= posts[i]["photo-caption"];
		var image	= posts[i]["photo-url-1280"];
		
		if (image){
			var newDiv 	= newContent( p_id, divs['tumblr'], 'tumblr', posts[i].slug, "<div><img class='contentImage' src='"+image+"' /><br />"+title+"</div>");
			newDiv.thumbImg.innerHTML = "<img class='tumblrImg' src='"+image+"' />";
			/*var div = document.createElement("div");
			div.id = p_id;
			div.className = "postDiv";

			var thumbDiv = document.createElement("div");
			thumbDiv.id = p_id+"_thumb";

			var thumbImg = document.createElement("div");
			if (image !='') thumbImg.innerHTML = "<img class='tumblrImg' src='"+image+"' />";
			thumbImg.className = "postImage";
			thumbDiv.appendChild(thumbImg);

			var thumbText = document.createElement("div");
			thumbText.innerHTML = title;
			thumbText.className = "thumbText";
			thumbDiv.appendChild(thumbText);

			div.appendChild(thumbDiv);
			divs["tumblr"].appendChild(div);*/
		}
	}
	if (numPosts - end > 0){
		var moreDiv = document.createElement("div");
		moreDiv.className 	= "moreButton";
		moreDiv.id			= divs["tumblr"].id+"_more";
		moreDiv.innerHTML 	= "MORE";
		moreDiv.onclick		= function(){
			removeElementById(divs["tumblr"].id+"_more");
			getTumblr( divs["tumblr"].id, 8 );
		};
		divs["tumblr"].appendChild(moreDiv);
	}
}

//FLICKR

function getFlickr( divId, number)
{
	if (contentIndicides["flickr"]){
		contentIndicides["flickr"].offset = contentIndicides["flickr"].number;
		contentIndicides["flickr"].number += number;
	} else {
		contentIndicides["flickr"] = {};
		contentIndicides["flickr"].number = number;
		contentIndicides["flickr"].offset = 0;
	}
	
	var page = 1 + contentIndicides["flickr"].offset/number;
	
	divs["flickr"] = document.getElementById(divId);
	$.ajax({
	  url: "http://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key="+key+"&user_id=12319387@N03&per_page="+number+"&page="+page+"&format=json",
	  dataType: "jsonp"
	});
}

//http://www.flickr.com/photos/{user-id}/{photo-id}
//http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg

function jsonFlickrApi(json){
	var posts = json.photos.photo;
	var page	 = json.photos.page;
	var pages = json.photos.pages;
	
	for (var i=0; i<posts.length; i++){
		var p_id 	= posts[i].id;
		var url  	= "http://www.flickr.com/photos/"+posts[i].owner+"/"+posts[i].id;
		var title	= posts[i].title;
		var image	= "http://farm"+posts[i].farm+".static.flickr.com/"+posts[i].server+"/"+posts[i].id+"_"+posts[i].secret+".jpg";
		var imageL	= "http://farm"+posts[i].farm+".static.flickr.com/"+posts[i].server+"/"+posts[i].id+"_"+posts[i].secret+"_b.jpg";

		var newDiv 	= newContent( p_id, divs['flickr'], 'flickr', title, "<div><img class='contentImage' src='"+imageL+"' /><br />"+title+"</div>");
		newDiv.thumbImg.innerHTML = "<img class='tumblrImg' src='"+image+"' />";

		/*var div = document.createElement("div");
		div.id = p_id;
		div.className = "postDiv";

		var thumbDiv = document.createElement("div");
		thumbDiv.id = p_id+"_thumb";

		var thumbImg = document.createElement("div");
		if (image !='') thumbImg.innerHTML = "<img class='tumblrImg' src='"+image+"' />";
		thumbImg.className = "postImage";
		thumbDiv.appendChild(thumbImg);

		var thumbText = document.createElement("div");
		thumbText.innerHTML = title;
		thumbText.className = "thumbText";
		thumbDiv.appendChild(thumbText);

		div.appendChild(thumbDiv);
		divs["flickr"].appendChild(div);*/
	}
	if (pages - page > 0){
		var moreDiv = document.createElement("div");
		moreDiv.className 	= "moreButton";
		moreDiv.id			= divs["flickr"].id+"_more";
		moreDiv.innerHTML 	= "MORE";
		moreDiv.onclick		= function(){
			removeElementById(divs["flickr"].id+"_more");
			getFlickr( divs["flickr"].id, 8 );
		};
		divs["flickr"].appendChild(moreDiv);
	}
}

//EEE
function getEEE(divId, numPosts )
{
	divs[divId] = document.getElementById(divId);
	
	var numToRequest = numPosts;
	
	if (contentIndicides[divId]){
		contentIndicides[divId].offset = contentIndicides[divId].number;
		contentIndicides[divId].number += numPosts;
	} else {
		contentIndicides[divId] = {};
		contentIndicides[divId].number = numPosts;
		contentIndicides[divId].offset = 0;
	}
	
	numToRequest = contentIndicides[divId].number;
	
	$.ajax({
	  url: "../endlessendlessendless/?json=get_posts&count="+numToRequest+"&custom_fields=image",
	  success: onCategoryLoaded,
	  dataType: "json"
	});
}

//utils
getQueryString = function (key)
{
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null)
		return '';
	else
		return qs[1];
}
