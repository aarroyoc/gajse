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
			var storage=require("./gajse-slim-storage");
			console.log("SET BACKGROUND MUSIC: "+evt.detail.resource);
			var data=storage.getResource(evt.detail.resource);
			this.audioContext.decodeAudioData(data,function(buffer){
					var source=this.audioContext.createBufferSource();
					source.buffer=buffer;
					source.connect(this.audioContext.destination);
					source.start(0);
			}.bind(this));
		}.bind(this));
		document.addEventListener("GAJSE_AddPositionalSound",function(){
			var intensity=evt.detail.intensity;
			var position=evt.detail.position;
		});
		document.addEventListener("GAJSE_ResetAudio",function(){
			
		});
		document.addEventListener("GAJSE_PlaySFX",function(evt){
			var storage=require("./gajse-storage");
			storage.getResource(evt.detail.resource,function(data){
				this.audioContext.decodeAudioData(data,function(buffer){
						var source=this.audioContext.createBufferSource();
						source.buffer=buffer;
						source.connect(this.audioContext.destination);
						source.start(0);
				});
			});
		});
		document.addEventListener("GASJE_PlayText",function(){
			
		});
	}

}
