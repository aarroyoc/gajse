/**
* The GAJSE character classes
* @constructor
*/
var msg=require("./gajse-msg");

exports.Character=function(name,color){
	this.name=name;
	this.color=color;
	this.getCharacterTalker=function(){
		
			return function(str){
				/* USE MSG MODULE */
				//console.log(this.name + " SAYS "+str);
				msg.say(str,this.color);
			}.bind(this);
	}.bind(this);
	return this;
}
