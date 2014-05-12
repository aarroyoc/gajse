/* A positional based audio system */

module.exports={
	audioContext: "",
	resources: {},
	/** Enables the Audio Layer
	 * @param resDir - The resource dir to look files
	 *  */
	enableAudio: function(resDir){
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioContext=new AudioContext();
		document.addEventListener("GAJSE_SetBackgroundMusic",function(evt){
			var storage=require("./gajse-storage");
			/*var id=setInterval(function(){
				if(this.resources[evt.detail.resource].loaded==true)
				{
					clearInterval(id);
					var source=this.audioContext.createBufferSource();
					source.buffer=this.resources[evt.detail.resource].buffer;
					source.connect(this.audioContext.destination);
					source.start(0);
				}
			}.bind(this),250);*/
			console.log("SET BACKGROUND MUSIC: "+evt.detail.resource);
			storage.getResource(evt.detail.resource,function(data){
				this.audioContext.decodeAudioData(data,function(buffer){
					var source=this.audioContext.createBufferSource();
					source.buffer=buffer;
					source.connect(this.audioContext.destination);
					source.start(0);
				}.bind(this));
			}.bind(this));
		}.bind(this));
		document.addEventListener("GAJSE_AddPositionalSound",function(){
			var intensity=evt.detail.intensity;
			var position=evt.detail.position;
		});
		document.addEventListener("GAJSE_ResetAudio",function(){
			
		});
		document.addEventListener("GAJSE_PlaySFX",function(){
			
		});
		document.addEventListener("GASJE_PlayText",function(){
			
		});
		/* The main idea behind this is load music before scene is displayed */
		/* We might try to use GAJSE Storage */
		document.addEventListener("GAJSE_PreloadAudioResource",function(evt){
			this.resources[evt.detail.resource]={};
			this.resources[evt.detail.resource].loaded=false;
			var xhr=new XMLHttpRequest();
			xhr.open("GET",resDir+evt.detail.file,true);
			xhr.responseType="arraybuffer";
			xhr.addEventListener("load",function(){
				this.audioContext.decodeAudioData(xhr.response,function(buffer){
					console.log("DECODED "+evt.detail.resource);
					this.resources[evt.detail.resource].buffer=buffer;
					this.resources[evt.detail.resource].loaded=true;
				}.bind(this));
			}.bind(this));
			xhr.send();
		}.bind(this));
	}

}
