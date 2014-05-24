/*
* gajse-mesh-actions.js
*/
exports.MeshActions=function MeshActions(overwrite){
	this.addPositionalAudio= function(resource,intensity){
		var event=new CustomEvent("GAJSE_AddPositionalAudio",{"detail" : {"resource": resource, "position": this.position, "intensity": intensity}});
		document.dispatchEvent(event);
	};
	this.addTextCallback=function(){
		
	};
	this.position= {
		x: 0,
		y: 0,
		z: 0
	};
	for(var over in overwrite)
	{
		this[over]=overwrite[over];
	}
	return this;
}
