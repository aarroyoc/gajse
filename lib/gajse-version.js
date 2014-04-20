module.exports={
	showVersion: function(){
			return "0.0.1";
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
