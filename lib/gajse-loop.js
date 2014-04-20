module.exports={
	conf: "",
	renderer: "",
	camera: "",
	scene: "",
	loadingBox: "",
	startLoop: function(rend, sc, cam, loadBox, data){
		this.conf=data;
		this.renderer=rend;
		this.scene=sc;
		this.camera=cam;
		this.loadingBox=loadBox;
		requestAnimationFrame(this.loop.bind(this));
	},
	loop: function(){
		if(this.loadingBox!="")
		{
			this.loadingBox.rotation.x+=0.1;
			this.loadingBox.rotation.y+=0.2;
		}
		
		/* INPUT */
		
		/* RENDER */
		this.renderer.render(this.scene,this.camera);
		requestAnimationFrame(this.loop.bind(this));
	}
};
