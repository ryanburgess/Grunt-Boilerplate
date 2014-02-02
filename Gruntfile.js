module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
	                style: 'compressed'
	            },
				files: [
		          {
		            expand: true,
		            cwd: 'source/',
		            src: ['**/*.scss'],
		            dest: 'css/',
		            ext: '.css',
		          },
		        ],
			}
		},
		uglify: {
		    dist: {
		      files: [
		      	{
		        	expand: true,
		          	cwd: 'js/',
		         	src: '**/*.js',
		            dest: 'js/',
		            ext: '.min.js'
		      	},
		      ],
		    }
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['newer:sass'],
				options: { 
					spawn: false,
					livereload: true 
				},
			},
			scripts: {
			    files: '**/*.js',
			    tasks: ['newer:uglify'],
			    options: { 
					spawn: false,
					livereload: true 
				},
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');
	grunt.registerTask('default',['watch']);
}