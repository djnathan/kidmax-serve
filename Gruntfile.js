/*global module:false*/
module.exports = function (grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    clean: {
      options: {
        force: true,
      },
      build: {
        src: ['build/wwwroot/**', 'mobile/www/**', '!build/wwwroot', '!mobile/www']
      },
    },
    copy: {
      site: {
        files: [
            { expand: true, cwd: 'assets/root', src: ['**'], dest: 'build/wwwroot' },
            { expand: true, cwd: 'assets', src: ['**', '!root/**', '!less/**', '!js/**'], dest: 'build/wwwroot' },
            { expand: true, cwd: 'assets/js', src: ['**'], dest: 'build/wwwroot/scripts' },
            { expand: true, cwd: 'bower_components', src: ['**', '!**/demo/**', '!**/test/**'], dest: 'build/wwwroot/lib' },
        ]
      },
      mobile: {
        files: [
            { expand: true, cwd: 'build/wwwroot', src: ['**'], dest: 'mobile/www' },
        ]
      },
    },
    less: {
      site: {
        files: [
          { 'build/wwwroot/style/hatch-logo.css': 'assets/less/hatch-logo.less' },
          { 'build/wwwroot/style/main.css': 'assets/less/main.less' },
        ]
      },
    },
    cssmin: {
      site: {
        files: [
          { 'build/wwwroot/style/hatch-logo.min.css': ['build/wwwroot/style/hatch-logo.css'] },
          { 'build/wwwroot/style/main.min.css': ['build/wwwroot/style/main.css'] },
        ]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      root: {
        files: ['assets/**', '!assets/less'],
        tasks: ['copy:site'],
      },
      less: {
        files: 'assets/less/**',
        tasks: ['less', 'cssmin'],
      }
    },
    express: {
      all: {
        options: {
          bases: ['build/wwwroot/'],
          port: 8085,
          hostname: 'localhost',
          livereload: true
        }
      }
    }
  });

  // usage: to build for qa add switch '--target=qa'
  var target = grunt.option('target') || 'dev';
  grunt.registerTask('default', ['clean', 'copy:site', 'less', 'cssmin', 'express', 'watch']);
  grunt.registerTask('web', ['clean', 'copy:site', 'less', 'cssmin']);
  grunt.registerTask('mobile', ['clean', 'copy:site', 'less', 'cssmin', 'copy:mobile']);
};
