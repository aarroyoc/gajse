/**
 * GAJSE Text module. It parses the GAJSE Text files for make decisions
 * @constructor
 * 
 * @since 0.0.2
 * */
exports.Text=function(resource){
	//var url=storage.getURLResourceAs(resource,"text/javascript");
	//var script=document.createElement("script");
	return this;
}
exports.ScriptedText=function(callback){
	this.speak=function(){
		callback();
	}
}
exports.Answer=function(answer,scriptedText){
	this.answer=answer;
	this.scriptedText=scriptedText;
}
exports.Question=function(options){
	this.answers=options;
	this.ask=function(){
		console.log("Current answers for the question");
		options.forEach(function(answer){
			//msg.say(answer.answer);
			console.log(answer.answer);
		});
	}
}
