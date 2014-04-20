var version=require("./lib/gajse-version");
var loader=require("./lib/gajse-loader");

console.log("GAJSE - "+version.showVersion());

window.addEventListener("load",function(){
	loader.loadConfiguration(function(data){
		loader.loadEnvironment(data);
	});
});
