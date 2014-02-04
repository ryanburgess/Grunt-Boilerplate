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
		imagemin: {                          
		    static: {                          
		      options: {                   
		        optimizationLevel: 3
		      },
		      files: {                         
		        'images/logo.png': 'images/logo.png'
		      }
		    },
		    dynamic: {                         
		      files: [{
		        expand: true,                  
		        cwd: 'images/',
		        src: ['**/*.{png,jpg,gif}'],   
		        dest: 'images/'                 
		      }]
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
			images: {
		      files: ['images/**/*.{png,jpg,gif}'],
		      tasks: ['imagemin'],
		      options: {
		      spawn: false,
		      }
		    }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
	grunt.registerTask('default',['watch']);
}