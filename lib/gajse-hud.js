/*
* gajse-hud.js Implements a SVG based HUD customizable
*/
var version=require("./gajse-version");
var storage=require("./gajse-slim-storage");
var { Feature }=require("./gajse-version");
module.exports={
	doc: "",
	div: "",
	localTime: "",
	slot: "",
	itemName: "",
	mode: "",
	minVersion: "",
	maxVersion: "",
	setHUD: function(resource){
		var hud=storage.getURLResourceAs(resource,{type: "image/svg+xml"});
		var xhr=new XMLHttpRequest();
		xhr.open("GET",hud,true);
		xhr.addEventListener("load",function(){
			var parser=new DOMParser();
			this.doc=parser.parseFromString(xhr.responseText,"image/svg+xml");
			this.localTime=this.doc.getElementById("local-time");
			this.slot=this.doc.getElementById("slot");
			this.itemName=this.doc.getElementById("itemName");
			this.mode=this.doc.getElementById("mode");
			this.minVersion=this.doc.getElementById("minVersion");
			this.maxVersion=this.doc.getElementById("maxVersion");
			this.div=document.createElement("div");
			this.div.id="GAJSE_HUD";
			this.div.style.width="128px";
			this.div.style.height="128px";
			this.div.style.position="relative";
			this.div.style.position="absolute";
			this.div.style.float="left";
			this.div.style.top="0px";
			this.div.style.left="0px";
			this.div.appendChild(this.doc.documentElement);
			document.body.appendChild(this.div);
			this.changeSelectedItem();
		}.bind(this));
		xhr.send();
	},
	changeSelectedItem: function(item){
		/* CHange values */
	},
	renderHUD: function(){
		var feature=new Feature("0.0.2","GAJSE HUD",this.minVersion);
		if(feature.check())
		{
			/* CHANGE VALUES */
		}
	}
}
