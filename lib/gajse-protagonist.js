var THREE=require("three");

exports.Protagoro=function(){
	THREE.Mesh.call(this);
}
Protagoro.prototype=Object.create(THREE.Mesh.prototype);
