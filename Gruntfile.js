module.exports = function(grunt) {
  'use strict';
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
            cwd: 'sass/',
            src: ['**/*.scss'],
            dest: 'build/css/',
            ext: '.css',
          },
        ],
      }
    },
    sassyclean: {
      options: {
        modules: ['sass/modules/**/*.scss', 'sass/themes/**/*.scss', 'sass/layout/**/*.scss', 'sass/base/**/*.scss'],
        buildfiles: ['sass/**/*.scss'],
        remove: false,
        days: null
      },
    },
    jshint: {
      all: ['js/**/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        eqnull: false,
        browser: true,
        indent: 2,
        quotmark: 'single',
        unused: false,
        ignores: ['node_modules/**/*.js'],
        globals: {
        },
      },
    },
    jsonlint: {
      sample: {
        src: [ '**/*.json' ]
      }
    },
    browserify: {
      dist: {
        options: {
        },
        files: {
          'js/project.js': ['build/js/project.js']
        },
      }
    },
    uglify: {
      dist: {
        files:{
          'build/js/project.min.js': ['build/js/project.js']
        },
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
        files: 'sass/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['newer:jshint', 'newer:browserify', 'uglify'],
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
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-sassyclean');
  grunt.registerTask('default',['watch']);
};