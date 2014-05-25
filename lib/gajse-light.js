/*
* gajse-light.js | The light system for GAJSE scenes using Three.js
*/
var THREE=require("three");

exports.Light=function(type,color,position,options){
	var light;
	if(type=="ambient")
		light=new THREE.AmbientLight(color);
	else if(type=="directional")
		light=new THREE.DirectionalLight(color,options.intensity);
	else if(type=="point")
		light=new THREE.PointLight(color,options.intensity,options.distance);
	var event=new CustomEvent("GAJSE_PushMesh",{"detail": {"position": position, "mesh": light}});
	document.dispatchEvent(event);
}
