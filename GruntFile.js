module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/boxAccordion.js',
        dest: 'build/boxAccordion.min.js'
      }
    },
    ngtemplates:  {
      boxaccordion:  {
        cwd: 'src/partials',
        src: '*.html',
        dest: 'build/app.templates.js',
        options: {
          module: 'ui.boxaccordion',
        }
      }
    },
    concat: {
      js:  {
        src:  ['src/js/boxAccordion.js', '<%= ngtemplates.boxaccordion.dest %>'],
        dest: 'build/boxAccordion.js',
      },
      css: {
        src: ['src/css/*.css'],
        dest: 'build/boxAccordion.css',
      }
    },
    karma: {
      debug: {
        configFile: 'test/karma.conf.js',
        autoWatch: true,
      },
      test: {
        configFile: 'test/karma.conf.js',      
        singleRun: true,
      }
    },
    imagemin: {                          
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'src/images',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'build/'                  
        }]
      }
    },
    clean: {
      templates: {
        src: ["<%= ngtemplates.boxaccordion.dest %>"]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-karma');
 

  // Default task(s).
  grunt.registerTask('build', ['karma:test', 'ngtemplates', 'imagemin', 'concat', 'uglify', 'clean']);
  grunt.registerTask('test', ['karma:test']);
  grunt.registerTask('debug', ['karma:debug']);



};