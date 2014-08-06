/**
 * A positional audio based system
 * @module gajse-audio
 */

var storage=require("./gajse-slim-storage");

/**
 * A positional audio system using WebAudio
 * @class gajse-audio
 * @since 0.0.3
 * @static
 * @uses gajse-slim-storage
 */
module.exports={
	/**
	 * @property audioContext
	 * @type AudioContext
	 * @default null
	 * @private
	*/
	audioContext: "",
	/**
	 * @property gainsNodes
	 * @type Array
	 * @default []
	 * @private
	*/
	gainsNodes: [],
	audioPos: {x: 0, y: 0, z: 0},
	/** Enables the Audio System
	 * @method enableAudio
	 * @since 0.0.3
	 *  */
	enableAudio: function(){
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioContext=new AudioContext();
		document.addEventListener("GAJSE_SetBackgroundMusic",function(evt){
			console.log("SET BACKGROUND MUSIC: "+evt.detail.resource);
			var data=storage.getResource(evt.detail.resource);
			this.audioContext.decodeAudioData(data,function(buffer){
					var source=this.audioContext.createBufferSource();
					source.buffer=buffer;
					source.connect(this.audioContext.destination);
					source.start(0);
			}.bind(this));
		}.bind(this));
		document.addEventListener("GAJSE_AddPositionalAudio",function(evt){
			var intensity=evt.detail.intensity;
			var position=evt.detail.position;
			var data=storage.getResource(evt.detail.resource);
			this.audioContext.decodeAudioData(data,function(buffer){
				var source=this.audioContext.createBufferSource();
				source.buffer=buffer;
				var node=this.audioContext.createGain();
				source.connect(node);
				node.connect(this.audioContext.destination);
				var gainNode={
					intensity: intensity,
					position: position,
					node: node,
					source: source
				};
				gainNode.source.start(0);
				this.gainsNodes.push(gainNode);
			}.bind(this));
		}.bind(this));
		document.addEventListener("GAJSE_ResetAudio",function(){

		});
		document.addEventListener("GAJSE_PlaySFX",function(evt){
			/*storage.getResource(evt.detail.resource,function(data){
				this.audioContext.decodeAudioData(data,function(buffer){
						var source=this.audioContext.createBufferSource();
						source.buffer=buffer;
						source.connect(this.audioContext.destination);
						source.start(0);
				});
			});*/
		});
		document.addEventListener("GASJE_PlayText",function(){

		});
	},
	/**
	 * Updates the audio with a new position
	 * @method setAudioPosition
	 * @since 0.0.3
	 * @param {THREE.Vector3} pos The new position
	*/
	setAudioPosition: function(pos){
		this.audioPos=pos;
		this.gainsNodes.forEach(function(gainNode){
			var firstOperator=Math.pow(gainNode.position.x-pos.x,2);
			var secondOperator=Math.pow(gainNode.position.y-pos.y,2);
			var square=Math.sqrt(firstOperator+secondOperator)+1;
			var value=(gainNode.intensity/square)+0.001;
			gainNode.node.gain.value=value;
		});
	}
}
