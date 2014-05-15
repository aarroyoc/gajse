/* gajse-api */
var loop=require("./gajse-loop");
var THREE=require("three");

module.exports={
	apiVersion: "0.0.3",
	meshActions: function(overwrite){
		this.addPositionalAudio= function(resource){
				var event=new CustomEvent("GAJSE_AddPositionalAudio",{"detail" : {"resource": resource, "position": this.position}});
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
	},
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
		return this.meshActions({position: position});
	},
	addManualObject: function(mesh,position){
		var event=new CustomEvent("GAJSE_PushMesh",{"detail": {"mesh": mesh,"position": position}});
		document.dispatchEvent(event);

		return this.meshActions({position: position});
	},
	addProtogoro: function(name){
		var ptr=new protogoro.Protogoro(name);
		ptr.geometry=new THREE.BoxGeometry(1,1,1);
		ptr.material=new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
		ptr.updateMatrix();
		var event=new CustomEvent("GAJSE_PushProtogoro",{"detail" : {"protogoro": ptr}});
		document.dispatchEvent(event);
		
	},
	setBackgroundMusic: function(resource){
		var event=new CustomEvent("GAJSE_SetBackgroundMusic",{"detail" : {"resource" : resource}});
		document.dispatchEvent(event);
	},
	playSFX: function(){
		
	},
	changeScene: function(){
		
	}
}
