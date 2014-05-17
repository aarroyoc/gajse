/*
* gajse-custscene.js
*/
var storage=require("./gajse-slim-storage");

module.exports={
	video: "",
	callback: "",
	finishCutscene: function(evt){
		document.body.removeChild(evt.target);
		if(typeof(this.callback) == "function")
			this.callback();
	},
	playCutscene: function(resource,cback,subtitles){
		this.callback=cback;
		this.video=document.createElement("video");
		this.article=document.getElementById("gajse");
		this.article.style.position="relative";
		this.video.style.position="absolute";
		this.video.style.float="left";
		this.video.style.top="0px";
		this.video.style.left="0px";
		this.video.style.height=window.innerHeight+"px";
		this.video.style.width=window.innerWidth+"px";
		this.video.addEventListener("click",this.finishCutscene.bind(this));
		this.video.addEventListener("ended",this.finishCutscene.bind(this));
		document.body.appendChild(this.video);
		this.video.src=storage.getURLResourceAs(resource,"video/webm");
		this.video.play();
		
		if(typeof(subtitles) === typeof(Array))
		{
			subtitles.forEach(function(subtitle){
				var track=document.createElement("track");
				track.srclang=subtitle.lang;
				track.kind="subtitles";
				track.label=subtitle.label;
				track.src=storage.getURLResourceAs(subtitle.resource,"text/vtt");
				this.video.appendChild(track);
			}.bind(this));
		}
	}
}
