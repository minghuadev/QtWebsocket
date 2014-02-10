// namespace IP   InfoPoster
"use strict";
if (window.IP === undefined)  window.IP = {};

IP.E={}; // the different Infoposter objects

IP.required_parms=['id','left','top','width','height'];
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


/* Example: 
 *
 * from console, or InfoposterDemo
 *
 * new IP.TextBlock({text:"hoi", left:0, top:0, width:100, height:50,id:"a",
 * 			css:{"background-color":"blue","border":"thin solid black"}})
 * IP.E.a.hide();
 * IP.E.a.show();
 * IP.E.a.dom.css({"font-size":"4em", "overflow":"hidden"})
 *
 */
IP.TextBlock=function(parms) {
	if ( IP.check_parms(parms) == false) { return; }
	if ( IP.E[parms.id] !== undefined) {
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
	this.dom.css( {
			position : "absolute",
			left     : parms.left+"px",
			width    : parms.width+"px",
			top      : parms.top+"px",
			height   : parms.height+"px"
		});

	if (parms.style) {this.dom.addClass(parms.style); }
	if (parms.css) { this.dom.css(parms.css); }

	this.dom.appendTo("body");
	IP.E[parms.id]=this;
	/* setTimeout 0 allows for dom update. 
	 * Without it, the easing function of the css doesn't work
	 */
	setTimeout( function(){ IP.E[parms.id].show(); }, 0); 
}

IP.TextBlock.prototype.show = function() {
	this.dom.removeClass("hidden");
}
IP.TextBlock.prototype.hide = function() {
	this.dom.addClass("hidden");
}
