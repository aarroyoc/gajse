function degToRad(deg)
{
	return deg * Math.PI / 180;
}

module.exports={
	conf: "",
	renderer: "",
	camera: "",
	scene: "",
	loadingBox: "",
	mesh: "",
	characters: "",
	input: "",
	clock: "",
	neck: "",
	sceneScript: "",
	protogoro: "",
	startLoop: function(rend, sc, cam, loadBox, data, inp){
		var THREE=require("three");
		this.conf=data;
		this.renderer=rend;
		this.scene=sc;
		this.camera=cam;
		this.loadingBox=loadBox;
		this.input=inp;
		this.input.enableInput();
		this.clock=new THREE.Clock();
		this.neck=new THREE.Object3D();
		this.neck.rotateOnAxis(new THREE.Vector3(1,0,0),degToRad(90));
		this.neck.up=new THREE.Vector3(0,0,1);
		this.neck.position.z;
		this.neck.position.y;
		this.neck.add(this.camera);
		this.scene.add(this.neck);
		requestAnimationFrame(this.loop.bind(this));
		setTimeout(function(){
			/* CHANGE TO DEFAULT SCENE */
			var xhr=new XMLHttpRequest();
			xhr.open("GET",this.conf.resources.scenes+"/main.json");
			xhr.responseType="json";
			xhr.addEventListener("load",function(){
				var event=new CustomEvent("GAJSE_LoadScene",{"detail": {"file": xhr.response.script}});
				document.dispatchEvent(event);
			});
			xhr.send();
		}.bind(this),1000);
		/* FUNCTION TO LOAD SCENES */
		document.addEventListener("GAJSE_LoadScene",function(evt){
			if(this.sceneScript!="")
				document.head.removeChild(this.sceneScript);
			this.sceneScript=document.createElement("script");
			this.sceneScript.type="text/javascript";
			this.sceneScript.src=this.conf.resources.scenes+"/"+evt.detail.file;
			document.head.appendChild(this.sceneScript);
			this.sceneScript.addEventListener("load",function(){
				this.protogoro="";
				this.scene=new THREE.Scene();
				sceneSetup();
				this.scene.add(this.neck);
			}.bind(this));
		}.bind(this));
		/* FUNCTION TO ADD MESH */
		document.addEventListener("GAJSE_PushMesh",function(evt){
			evt.detail.mesh.position=evt.detail.position;
			this.scene.add(evt.detail.mesh);
		}.bind(this));
		document.addEventListener("GAJSE_PushProtogoro",function(evt){
			this.protogoro=evt.detail.protogoro;
			this.protogoro.position.set(0,0,0);
			this.scene.add(this.protogoro);
		}.bind(this));
	},
	loop: function(){
		var THREE=require("three");
		var collider=require("./gajse-collision");
		var delta=this.clock.getDelta();
		if(this.loadingBox!="")
		{
			this.loadingBox.rotation.x+=1.0*delta;
			this.loadingBox.rotation.y+=2.0*delta;
		}
		collider.refresh(this.camera.position,this.scene.children);
			
		/* INPUT */
		if(this.input.getInput().KEY_A===true && collider.getMovements().LEFT===true)
		{
			this.camera.position.x-=1.0*delta;
		}
		if(this.input.getInput().KEY_D===true && collider.getMovements().RIGHT===true)
		{
			this.camera.position.x+=1.0*delta;
		}
		if(this.input.getInput().KEY_S===true && collider.getMovements().BACK===true)
		{
			this.camera.position.z+=1.0*delta;
		}
		if(this.input.getInput().KEY_W===true && collider.getMovements().GO===true)
		{
			this.camera.position.z-=1.0*delta;
		}
		if(this.input.getInput().KEY_Q===true)
			this.neck.rotation.y+=degToRad(45*delta);
		if(this.input.getInput().KEY_E===true)
			this.neck.rotation.y-=degToRad(45*delta);
		
		/* RENDER */
		this.renderer.render(this.scene,this.camera);
		requestAnimationFrame(this.loop.bind(this));
	}
};
