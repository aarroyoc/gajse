module.exports=function(grunt){
	//browserify -r ./lib/gajse-api -r three > gajse.test.js
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		browserify: {
			js: {
				src: "gajse.js",
				dest: "gajse.min.js",
				options: {
					require: ["three","./lib/gajse-api"]
				}
			} 
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: "gajse.min.js",
				dest: "gajse.ugly.js"
			}
		},
		jsdoc: {
			dist: {
				src: "lib/*.js",
				options: {
					destination: "doc"
				}
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-jsdoc");
	
	grunt.registerTask("default",["browserify"]);
	grunt.registerTask("release",["browserify","uglify","jsdoc"]);
	grunt.registerTask("test",["browserify","uglify","jsdoc"]);
	
	
	
	
}
