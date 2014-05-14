/* GAJSE Buffer Storage */
/* We can use IndexedDB to use 50MB steps of data */
/* People should declare the preloadedResources for loading at startup and saving it to IndexedDB */
/* Resource API should access IndexedDB data */

var crypto=require("crypto");

module.exports={
	dbVersion: 7,
	adding: true,
	resCount: 0,
	resTotal: 0,
	/**
	 * It validates the checksum of a file for remove duplicate content on buffer */
	validateChecksum: function(file,originalChecksum){
		var hash=crypto.createHash("md5");
		hash.update(file,"utf8");
		var md5=hash.digest("hex");
		if(originalChecksum==md5)
			return true;
		else
			return false;
	},
	createChecksum: function(file){
		var hash=crypto.createHash("md5");
		hash.update(file,"utf8");
		return hash.digest("hex");
	},
	/**
	 * Call it for every resources.json file
	 * @param json - The resources.json file already parsed
	 * @param dir - The dir to lookup for resources */
	setupResources: function(json,dir){	
		this.adding=true;
		var request=window.indexedDB.open("GAJSE-Resources",this.dbVersion);
		request.data=new Object;
		request.data.json=json;
		request.data.dir=dir;
		request.addEventListener("error",this.genericError);
		request.addEventListener("success",this.successCallback.bind(this));
		request.addEventListener("upgradeneeded",this.setupResourceTable.bind(this));
	},
	addResource: function(db,filename,resource){
		/* Download file */
		var xhr=new XMLHttpRequest();
		xhr.open("GET",filename+"?timestamp="+new Date().getTime(),true);
		xhr.setRequestHeader("User-Agent","GAJSE 0.0.2/Resource system");
		xhr.responseType="arraybuffer";
		xhr.addEventListener("load",function(){
			/* Get checksum from database */
			/* Create checksum of file*/
			var checksum=this.createChecksum(xhr.response);
			/* if different add to IndexedDB */
				console.log("DOWNLOAD FINISHED");
				var obj=db.transaction(["Resources"],"readwrite").objectStore("Resources");
				var newObj={
					name: resource,
					data: xhr.response,
					checksum: checksum
				};
				var req=obj.put(newObj);
				req.addEventListener("success",function(){
					console.log("ADDED ITEM: "+newObj.name);
					this.resCount++;
					console.log("RESOURES "+ this.resCount);
				}.bind(this));
				req.addEventListener("error",function(){
					console.log("ERROR ON ADDING ITEM");
				});
		}.bind(this));
		xhr.send();
	},
	successCallback: function(evt){
		var db=evt.target.result;
		var json=evt.target.data.json;
		var dir=evt.target.data.dir;
		if(json!=null || json!=undefined)
		{
			for(var resName in json)
			{
				console.log("ADDING RESOURCE: "+resName);
				this.addResource(db,dir+json[resName],resName);
				this.resTotal++;
			}
		}
	},
	setupResourceTable: function(evt){
		var db=evt.target.result;
		if(db.objectStoreNames.contains("Resources"))
		{
			db.deleteObjectStore("Resources");
		}
		var objStore=db.createObjectStore("Resources",{keyPath: "checksum"});
		objStore.createIndex("name","name",{unique: true});
		objStore.createIndex("data","data",{unique: false});
		objStore.transaction.addEventListener("complete",function(){
			this.successCallback(evt);
		}.bind(this));
	},
	getResource: function(resource, callback){
		var request=indexedDB.open("GAJSE-Resources",this.dbVersion);
		request.addEventListener("success",function(evt){
			var db=evt.target.result;
			var index=db.transaction(["Resources"]).objectStore("Resources").index("name").get(resource);
			index.addEventListener("success",function(evet){
				callback(evet.target.result["data"]);
			});
			index.addEventListener("error",this.genericError);
			});
		request.addEventListener("error",this.genericError);
	},
	isDownloadingFinished: function(){
		if(this.resTotal <= this.resCount)
			return true;
		else
			return false;
	},
	genericError: function(evt){
		console.error("ERROR on the gajse-storage module. CODE: "+evt.target.errorCode);
	}
}
