module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
		'less:dev',
		'sass:dev', 
		'compass:angular', 
		'sync:dev',
		'coffee:dev'
	]);
};
