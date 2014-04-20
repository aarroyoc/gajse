module.exports={
	conf: "",
	renderer: "",
	camera: "",
	scene: "",
	loadingBox: "",
	input: "",
	clock: "",
	startLoop: function(rend, sc, cam, loadBox, data, inp){
		var THREE=require("three");
		this.conf=data;
		this.renderer=rend;
		this.scene=sc;
		this.camera=cam;
		this.loadingBox=loadBox;
		this.input=inp;
		this.clock=new THREE.Clock();
		requestAnimationFrame(this.loop.bind(this));
	},
	loop: function(){
		var THREE=require("three");
		var delta=THREE.Clock.getDelta();
		if(this.loadingBox!="")
		{
			this.loadingBox.rotation.x+=0.1*delta;
			this.loadingBox.rotation.y+=0.2*delta;
		}
		
		/* INPUT */
		if(this.input.getInput().KEY_A===true)
		{
			this.camera.position.z+=0.1*delta;
		}
		/* RENDER */
		this.renderer.render(this.scene,this.camera);
		requestAnimationFrame(this.loop.bind(this));
	}
};
