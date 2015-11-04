module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['browserify', 'copy', 'watch']);

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
    	},
    	main: {
    		src: 'src/styles/*.css',
    		dest: 'public/styles/main.css'
    	}
    },
    watch: {
      files: 'src/**/*.*',
      tasks: ['default']
    }
  });
}