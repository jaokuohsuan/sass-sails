
module.exports = function(grunt) {

	grunt.config.set('compass', {		
	  angular:{
	  	options: {
	  	   sassDir: 'angular/app/sass',
	       cssDir: 'angular/app/css',
	       generatedImagesDir: '.tmp/images/generated',
	       imagesDir: 'angular/app/images',
	       javascriptsDir: 'angular/app/scripts',
	       fontsDir: 'angular/app/css/fonts',
	       httpImagesPath: '/images',
	       httpGeneratedImagesPath: '/images/generated',
	       httpFontsPath: '/css/fonts',
	       //sourcemap: true,
	       require: ['susy','breakpoint'],        
	       relativeAssets: false,
	       debugInfo: false,
           outputStyle: 'compressed'
	    },
	    dist: {}   

	  }
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
};
