/*
* gajse-slim-storage.js we don't use databases
*/

module.exports={
	storage: {},
	resTotal: 0,
	resCount: 0,
	callback: "",
	putResource: function(resource,data){
		console.log("ADDING RESOURCE: "+resource+" "+(this.resCount/this.resTotal)*100+"%");
		this.storage[resource]=data;
		this.resCount++;
		if(this.resTotal == this.resCount){
			this.callback();
		}
	},
	putHTTPResource: function(resource,url){
		var xhr=new XMLHttpRequest();
		xhr.open("GET",url+"?timestamp="+new Date().getTime());
		xhr.responseType="arraybuffer";
		xhr.addEventListener("load",function(){
			this.putResource(resource,xhr.response);
		}.bind(this));
		xhr.send();
	},
	getResource: function(resource){
		return this.storage[resource];
	},
	getURLResourceAs: function(resource,mimeType){
		var res=this.storage[resource];
		var blob=new Blob([res],{type: mimeType});
		return URL.createObjectURL(blob);
	},
	setupResources: function(json,dir){
		for(var resName in json)
		{
			this.resTotal++;
			this.putHTTPResource(resName,dir+json[resName]);
		}
	},
	init: function(confFiles,callback){
		this.callback=callback;
		for(var resType in confFiles)
		{
			var resHttp=new XMLHttpRequest();
			resHttp.open("GET",confFiles[resType]+"resources.json",true);
			resHttp.responseType="json";
			resHttp.resDir=confFiles[resType];
			resHttp.addEventListener("load",function(evt){
				this.setupResources(evt.target.response,evt.target.resDir);
			}.bind(this));
			resHttp.send();
		}	
	}
}
