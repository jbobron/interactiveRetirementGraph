module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'browserify', 'copy', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
    	options: {
    		transform: ['reactify']
    	},
      main: {
        src: 'src/App.js',
        dest: 'public/App.js'
      }
    },
    copy: {
    	main: {
    		src: 'src/index.html',
    		dest: 'public/index.html'
    	}
    },
    watch: {
      files: 'src/**/*.*',
      tasks: ['default']
    },
    clean: {
      src: 'public/**/*.*'
    }
  });
}