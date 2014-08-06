/**
 * Some utilities related to versioning
 * @module gajse-version
 * @static
 * @since 0.0.1
 */

var version="0.1.0";


/**
 * YUIDoc class for the static methods under gajse-version
 * @class gajse-version
 * @static
*/
module.exports={
	/**
	 * Gets the current version of GAJSE
	 * @method showVersion
	 * @static
	 * @since 0.0.1
	 * @return {String} The current version using [SemVer](http://semver.org)
	 * @example
	 * 	var gajseVersion=version.showVersion();
	 */
	showVersion: function(){
			return version;
		},
	/**
	 * @method checkFeatureVersion
	 * @static
	 * @param {Feature} feature Check if we can use a feature
	 * @return {Boolean} True if it can be used, false otherwise
	 * @since 0.0.4
	 * @beta
	*/
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

/**
 * A tool for know if a feature is available. Should be used via 3rd party developers
 * @class Feature
 * @constructor
 * @param {Float} minVersion The mininmun version of the feature
 * @param {String} description A little description about the feature
 * @param {Float} contentVersion The GAJSE files version
 * @beta
 * @since 0.0.4
*/
exports.Feature=function Feature(minVersion,description,contentVersion){
	this.minVersion=minVersion;
	this.description=description;
	this.contentVersion=contentVersion;
	/**
	 * @method check
	 * @return {Boolean} True if available
	 * @beta
	 * @since 0.0.4
	 */
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
