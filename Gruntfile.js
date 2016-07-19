module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    srcs: {src: ['app/app.module.js', 'app/app.config.js', 'app/*!(.mocks|.spec).js', 'app/**/*(!(.mocks|.spec)).js'], 
           test: 'app/**/*.spec.js'},
    
    exec: {
      update_tests: {
        cmd: function() {
          return 'npm run copy';
        }
      },
      move: {
        cmd: function() {
          var string1 = 'cp -R app/*.js src/; cp -R app/**/*.module.js src/ ';
          var endings = ['.filter', /*'.service',*/ '.value', '.controller', '.factory'];
          for (end in endings) {
            string1 = string1 + '; cp -R app/**/*' + endings[end] + '.js src/';
//            string1 = string1 + '; cp -R app/*' + endings[end] + '.js src/ ';
          }
          return string1;
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      chrome: {
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        browsers: ['Chrome']
      },
      chromeTest: {
        //autoWatch: true,
        //singleRun: false,
        //concurrency: Infinity,
        browsers: ['Chrome']
      },
      dev: {
        coverageReporter: {
          type: 'text-summary'
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'tests/**/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('proofread', ['jshint']);
  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('dev', ['jshint', 'karma:dev']);
 
  grunt.registerTask('copy', ['exec:update_tests']);
  grunt.registerTask('move', ['exec:move']);
  grunt.registerTask('test', ['copy', 'move', 'karma:chrome']);
  grunt.registerTask('buildTest', ['copy', 'move', 'karma:chromeTest']);
  grunt.registerTask('production', 'initiates production testing', function() {
    var paths = grunt.file.expand({}, ['app/+([a-zA-Z])+(.+([a-zA-Z]))/*([a-zA-Z.])!(.mock|.spec).js', 'app/+([a-zA-Z.]).js']);
    
    grunt.log.ok(paths);
    for (var path in paths) {
      var pathSplit = paths[path].split('/');
      var name = pathSplit[pathSplit.length - 1];
      
      name = 'src/' + name;
      
      grunt.log.ok('Source Path: ' + name);
      grunt.file.copy(paths[path], name);
    }
    grunt.log.writeln("");
    paths = grunt.file.expand(['app/**/*.spec.js']);
    for (var path in paths) {
      var pathSplit = paths[path].split('/');
      var name = pathSplit[pathSplit.length - 1];
      var name = 'tests/' + name;
      grunt.log.ok('Test Path: ' + name);
      grunt.file.copy(paths[path], name);
    }
    grunt.task.run('test');
  });
};
