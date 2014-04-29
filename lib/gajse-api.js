/* gajse-api */
var loop=require("./gajse-loop");
var protogoro=require("./gajse-protogoro");
var THREE=require("three");

module.exports={
	apiVersion: "0.0.3",
	setScene: function(sceneFile){
		
	},
	addObject: function(objectFile,position){
		new THREE.JSONLoader().load(objectFile,function(geo,mat){
			var mesh=new THREE.Mesh(geo,new THREE.MeshFaceMaterial(mat));
			mesh.frustumCulled=false;
			mesh.updateMatrix();
			var event=new CustomEvent("GAJSE_PushMesh",{"detail": {"mesh": mesh, "position": position}});
			document.dispatchEvent(event);
		});
	},
	addManualObject: function(mesh,position){
		var event=new CustomEvent("GAJSE_PushMesh",{"detail": {"mesh": mesh,"position": position}});
		document.dispatchEvent(event);
	},
	addProtogoro: function(name){
		var ptr=new protogoro.Protogoro(name);
		ptr.geometry=new THREE.BoxGeometry(1,1,1);
		ptr.material=new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
		ptr.updateMatrix();
		var event=new CustomEvent("GAJSE_PushProtogoro",{"detail" : {"protogoro": ptr}});
		document.dispatchEvent(event);
		
	},
	setBackgroundMusic: function(file){
		
	},
	playSFX: function(){
		
	},
	preloadAudioResource: function(file, resource){
		var event=new CustomEvent("GAJSE_PreloadResource",{"detail": {"file": file, "resource": resource}});
		document.dispatchEvent(event);
	},
	changeScene: function(){
		
	}
}
