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
	var camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,10000);
	camera.position.z=1000;
	var loadingGeo=new THREE.BoxGeometry(500,500,500);
	var loadingMat=new THREE.MeshBasicMaterial({map: logo});
	var loadingBox=new THREE.Mesh(loadingGeo, loadingMat);
	scene.add(loadingBox);
	var renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.getElementById("gajse").appendChild(renderer.domElement);
	
	loop.startLoop(renderer,scene,camera, loadingBox, data, input);
	
	var desc=msg.say(data.description, false, 0, "top","blue");
	var copyright=msg.say("Another amazing project using GAJSE " + version.showVersion(),false,0,"bottom","red");
}
