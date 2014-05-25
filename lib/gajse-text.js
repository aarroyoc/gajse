/**
 * GAJSE Text module. It parses the GAJSE Text files for make decisions
 * @constructor
 * 
 * @since 0.0.2
 * */
exports.Text=function(resource){
	var url=storage.getURLResourceAs(resource,"text/javascript");
	var script=document.createElement("script");
	return this;
}
exports.ScriptedText=function(callback){
	this.speak=function(){
		callback();
	}
}
