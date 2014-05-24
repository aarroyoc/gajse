var version="0.0.2";

module.exports={
	showVersion: function(){
			return version;
		},
	checkFeatureVersion: function(feature){
			if(feature.minVersion>=this.showVersion())
				return true;
			else
				return false;
		},
	showLicense: function(){
			return "GAJSE LICENSE\nThe GAJSE license is under the Affero GPL or a Commercial license";
		}
};

exports.Feature=function Feature(minVersion,description,contentVersion){
	this.minVersion=minVersion;
	this.description=description;
	this.contentVersion=contentVersion;
	this.check=function(){
		if(this.minVersion>=version)
		{
			if(this.contentVersion>=version)
			{
				return true;
			}else
				return false;
		}else
			return false;
	};
	return this;
};
