var THREE=require("three");

var Protogoro=exports.Protogoro=function(nameProtogoro){
	THREE.Mesh.call(this);
	this.name=name;
}
Protogoro.prototype=Object.create(THREE.Mesh.prototype);
