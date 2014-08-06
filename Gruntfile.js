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
		yuidoc: {
			compile:{
				name: "GAJSE",
				description: "GAJSE is a JavaScript library for support 3D graphic adventures",
				version: "<%= pkg.version %>",
				url: "http://adrianarroyocalle.github.io/gajse",
				logo: "./gajse.svg",
				options: {
					paths: ["lib"],
					//themedir,
					outdir: "doc"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-yuidoc");

	grunt.registerTask("default",["browserify"]);
	grunt.registerTask("release",["browserify","uglify"]);
	grunt.registerTask("test",["browserify","uglify"]);




}
