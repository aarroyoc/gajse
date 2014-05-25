exports.loadConfiguration=function (callback){
	/* Loads the GAJSE JSON file */
	this.domElement=document.getElementById("gajse");
	if(this.domElement==undefined)
	{
		console.exception("There isn't any DOM element with the 'gajse' id");
	}
	this.jsonFile=this.domElement.dataset.gajse;
	if(this.jsonFile==undefined)
	{
		console.exception("The 'gajse' element doesn't have a data-gajse attributte");
	}
	console.log("LOADING: " + this.jsonFile);
	var xhr=new XMLHttpRequest();
	xhr.open("GET",this.jsonFile,true);
	xhr.responseType="json";
	xhr.addEventListener("load",function(evt){
		console.log("PARSED: " + this.jsonFile);
		callback(xhr.response);
	}.bind(this));
	xhr.send();
}
exports.loadEnvironment=function(data){
	var THREE=require("three");
	var loop=require("./gajse-loop");
	var msg=require("./gajse-msg");
	var version=require("./gajse-version");
	var input=require("./gajse-input");
	
	var logo=THREE.ImageUtils.loadTexture(data.icon64);
	var scene=new THREE.Scene();
	var camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.25,100);
	camera.position.z=2;
	var loadingGeo=new THREE.BoxGeometry(50,50,50);
	var loadingMat=new THREE.MeshBasicMaterial({map: logo});
	var loadingBox=new THREE.Mesh(loadingGeo, loadingMat);
	scene.add(loadingBox);
	var renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.getElementById("gajse").appendChild(renderer.domElement);
	
	loop.startLoop(renderer,scene,camera, loadingBox, data, input);
	
	var desc=msg.say2(data.description, false, 0, "top","blue");
	var copyright=msg.say2("Another amazing project using GAJSE " + version.showVersion(),false,0,"bottom","red");
	setTimeout(function(){
			document.getElementById("gajse").removeChild(desc);
			document.getElementById("gajse").removeChild(copyright);
	},2500);
}
