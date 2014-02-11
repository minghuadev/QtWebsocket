// namespace IP   InfoPoster
"use strict";
if (window.IP === undefined)  window.IP = {};

IP.E={}; // the different Infoposter objects

/* Example: 
 
  from console, or InfoposterDemo
 
  new IP.TextBlock({text:"hoi", left:"0px", top:"0px", width:"100px", height:"50px", id:"a",
			css:{"background-color":"blue","border":"thin solid black"}})
  IP.hide("a");
  IP.show("a");
  IP.E.a.dom.css({"font-size":"4em", "overflow":"hidden"})
 
  new IP.Video({left:"200px",top:"0px",width:"400px",height:"200px", id:"v", 
  		src:"Content/Man\ of\ Steel\ -\ Official\ Nokia\ Exclusive\ Trailer\ [HD].mp4"})

  new IP.Image({left:"0px",top:"100px",width:"200px",height:"200px",id:"i", 
  		src:"Content/01-02-14\ Thomas\ van\ Luyn1.png"})
 */


/* IP generic utility function
 */
IP.required_parms=['id','left','top','width','height'];

// check existence of keys in parms, using required_parms +
// more_required_parms
IP.check_parms = function(parms, more_required_parms) {
	more_required_parms = more_required_parms || [];
	var required_parms = $.merge(more_required_parms, IP.required_parms);
	for(var i=0; i<required_parms.length;i++) {
		if( parms[required_parms[i]] === undefined) {
			console.error("parms",parms,"misses required field", required_parms[i]);
			return false;
		}
	};
	return true;
}

// check if Infoposter object <id> exists. in the browser
IP.check_id=function(id) {
	if ( IP.E[id] === undefined) {
		console.error("infoposter id:",id, "not defined");
		return false;
	}
	return true;
}

IP.show = function(id) { 
	if ( IP.check_id(id))  {
		IP.E[id].dom.removeClass("hidden");
	}
}

IP.hide = function(id) { 
	if ( IP.check_id(id))  {
		IP.E[id].dom.addClass("hidden");
	}
}

// setup the top <div>  for an IP object
IP.setup_div = function(dom, parms) {
	dom.css( {
		position : "absolute",
		left     : parms.left,
		width    : parms.width,
		top      : parms.top,
		height   : parms.height,
	});
	if (parms.style) {
		dom.addClass(parms.style); 
	}
	if (parms.css) { 
		dom.css(parms.css); 
	}
}

// gently removes an existing IP object from the dom, by first going to opacity 0, and only
// then removing it. 
// transition end event is webkit specific, need something different for other
// browsers, otherwise we pollute the dom.
IP.soft_remove = function(id) {
	if ( IP.E[id] !== undefined) {
		console.log("IP.E[",id, "] already exists. We'll remove it first");
		var dom = IP.E[id].dom;
		dom.addClass('hidden'); // transition to invisible state
		dom[0].addEventListener('webkitTransitionEnd', function(e) {
			dom.remove(); // remove element at the end of the transition
		});
		delete IP.E[id];
	}
}

/* creates a TextBlock
 *
 *
 */
IP.TextBlock=function(parms) {
	if ( IP.check_parms(parms) == false) { return; }
	IP.soft_remove(parms.id);

	this.parms=parms; // just for reference
	this.dom = $("<div>", {
		id: parms.id,
		text: parms.text,
		"class":"hidden"
	});
	IP.setup_div(this.dom, parms);
	this.dom.appendTo("body");
	IP.E[parms.id]=this;
	// setTimeout 0 allows for dom update. 
	// Without it, the easing function of the css doesn't work
	setTimeout( function(){ IP.show(parms.id); }, 0); 
}

/* creates an html5 video element.
 * Todo: We might need to make different movie object, dependent on the kind of
 * video being provided.
 */
IP.Video=function(parms) {
	if ( IP.check_parms(parms, ["src"] ) == false) { return; }
	if ( IP.E[parms.id] !== undefined) {
		// can't soft remove videos, so we don't use IP.soft_remove
		console.log("IP.E[",parms.id, "] already exists. We'll remove it first");
		IP.E[parms.id].dom.remove();
		delete IP.E[parms.id];
	}

	this.parms=parms; // just for reference
	this.dom = $("<div>", {
		id: parms.id,
		text: parms.text,
		"class":"hidden"
	});
	IP.setup_div(this.dom, parms);
	var video = $("<video>", {
		src:parms.src,
		autoplay: "autoplay",
		loop: "loop",
		css:{
			width:"100%",
			height:"100%"
		}
	});
	video.appendTo(this.dom);
	this.video= video[0]; // jQuery returns a list, even though it's only one
	this.dom.appendTo("body");
	IP.E[parms.id]=this;
	setTimeout( function(){ IP.show(parms.id); }, 0); 
}

IP.Video.prototype.play=function() { this.video.play(); }
IP.Video.prototype.pause=function() { this.video.pause(); }

/* Infoposter Image  object
 */
IP.Image=function(parms) {
	if ( IP.check_parms(parms, ["src"] ) == false) { return; }
	IP.soft_remove(parms.id);
	this.parms=parms; // just for reference
	this.dom = $("<div>", {
		id: parms.id,
		"class":"hidden"
	});
	IP.setup_div(this.dom, parms);
	this.img = $("<img>", {
		src:parms.src,
		css:{
			width:"100%",
			height:"100%"
		}
	});
	this.img.appendTo(this.dom);
	this.dom.appendTo("body");
	IP.E[parms.id]=this;
	setTimeout( function(){ IP.show(parms.id); }, 0); 
}
