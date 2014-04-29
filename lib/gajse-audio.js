/* A positional based audio system */

module.exports={
	audioContext: "",
	resources: {},
	enableAudio: function(){
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioContext=new AudioContext();
		document.addEventListener("GAJSE_SetBackgroundMusic",function(evt){
			while(this.resources[evt.detail.resource].loaded!=true)
			{
				
			}
			var source=this.audioContext.createBufferSource();
			source.buffer=this.resources[evt.detail.resource].buffer;
			source.connect(this.audioContext.destination);
			source.start(0);
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
		document.addEventListener("GAJSE_PreloadResource",function(evt){
			this.resources[evt.detail.resource]={};
			this.resources[evt.detail.resource].loaded=false;
			var xhr=new XMLHttpRequest();
			xhr.open("GET",evt.detail.file,true);
			xhr.responseType="arraybuffer";
			xhr.addEventListener("load",function(){
				this.audioContext.decodeAudioData(xhr.response,function(buffer){
					this.resources[evt.detail.resource].buffer=buffer;
					this.resources[evt.detail.resource].loaded=true;
				}.bind(this));
			}.bind(this));
			xhr.send();
		}.bind(this));
	}

}
