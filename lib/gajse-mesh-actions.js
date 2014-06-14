var THREE=require("three");

/**
* gajse-mesh-actions.js
* @exports
* @constructor
* @param overwrite - An array for overwrite the default parameters
* @module The MeshActions module exports options for actual generated meshes.
*/
exports.MeshActions=function MeshActions(overwrite){
	/**
	 * Adds a point of Positional Audio in the mesh 
	 * @public
	 * @author Adrian Arroyo Calle
	 * @exports
	 * @fires GAJSE_AddPositionalAudio
	 * @method Add a source of positional audio in the mesh place
	 * @param resource - The resource name. It should be Audio.
	 * @param intensity - The intensity factor. The final intensity value for the audio depends on this.
	 * @see addTextCallback
	 * @since 0.0.2
	 * @version 0.1.0
	 * */
	 
	this.addPositionalAudio= function(resource,intensity){
		var event=new CustomEvent("GAJSE_AddPositionalAudio",{"detail" : {"resource": resource, "position": this.position, "intensity": intensity}});
		document.dispatchEvent(event);
	};
	this.addCollectableItem=function(){
		
	};
	this.makeCharacter=function(){
		
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
