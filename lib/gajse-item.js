/*
* gajse-item.js
*/
/**
 * An Item is a object that can interact with another items. It defines some methods.
 * @constructor
 * @param nam - The name of the item
 * @param descriptio - The description of the item when the user takes a look
 * @param im - A resource containing the image for the HUD
 * */
exports.Item=function Item(nam,descriptio,im)
{
	var callbacks={
		action: function(){},
		thinking: function(){},
		collect: function(){}
	};
	var name=nam;
	var description=descriptio;
	var img=im;
	this.addActionCallback=function(cback){
		callbacks.action=cback;
	};
	this.addThinkingCallback=function(cback){
		callbacks.thinking=cback;
	};
	this.addCollectCallback=function(cback){
		callbacks.collect=cback;
	};
	this.setName=function(nam){
		name=nam;
	};
	this.setDescription=function(descriptio){
		description=descriptio;
	};
	this.setImage=function(resource){
		img=resource;
	};
	return this;
}
