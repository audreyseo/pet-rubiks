module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    srcs: {src: ['app/app.module.js', 'app/app.config.js', 'app/*!(.mocks|.spec).js', 'app/**/*(!(.mocks|.spec)).js'], 
           test: 'app/**/*.spec.js'},
    
    exec: {
      updatetests: {
        cmd: function() {
          return 'npm run copy';
        }
      },
      move: {
        cmd: function() {
          var string1 = 'cp -R app/*.js src/; cp -R app/**/*.module.js src/ ';
          string1 = string1 + "cp -R app/app.*.js src/ ; cp app/*.directive.js src/ ; cp app/*.value.js src/ ";
          var endings = ['.filter', /*'.service',*/ '.value', '.controller', '.factory'];
          for (var end in endings) {
            string1 = string1 + '; cp -R app/**/*' + endings[end] + '.js src/';
//            string1 = string1 + '; cp -R app/*' + endings[end] + '.js src/ ';
          }
          return string1;
        }
      },
      movereports: {
        cmd: function() {
          var templateA = 'mv build/reports/';
          var templateB = "* build/reports/";
          var string1 = templateA + 'coverage/report-';
          var string2 = templateB + 'coverage/old/report-';
          var strings = ["clover/", "html/", "lcov/"];
          var command = "";
          for (var report in strings) {
            var name = strings[report];
            command += string1 + name + string2 + name + " ;";
          }
          string1 = templateA + 'junit/';
          string2 = templateB + 'junit/old/';

          command += string1 + "*.xml" + string2 + ";";
          string1 = templateA + "target/site/clover/*.xml build/reports/target/old/";
          command += string1;
          return command;
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
        concurrency: "Infinity",
        browsers: ['Chrome']
      },
      chrometest: {
        logLevel: "config.LOG_DEBUG",
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
  //grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  

  grunt.registerTask('clean', ['exec:movereports']);
  grunt.registerTask('proofread', ['jshint']);
  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('dev', ['jshint', 'karma:dev']);
  grunt.registerTask('copy', ['exec:updatetests']);
  grunt.registerTask('move', ['exec:move']);

  grunt.registerTask('test', ['clean', 'copy', 'move', 'karma:chrome']);
  grunt.registerTask('buildtest', ['clean', 'copy', 'move', 'karma:chrometest']);
  
  
  
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

replaceAll = function(search, replacement, look) {
      var target = look;
      return target.replace(new RegExp(search, 'g'), replacement);
};
function todaysDate() {
            return target.replace(new RegExp(search, 'g'), replacement);
            var today = new Date();
            today.setDate(today.getDate());

            var day = today.getDate();
            var month = 1 + today.getMonth();

            var dateOptions = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'EDT', hour: '2-digit', minute: '2-digit', second: '2-digit'};
            //today = today.toLocaleFormat("%a %e %B %Y %I.%M.%S %p %Z");
            today = replaceAll(':', '.', today.toLocaleString(dateOptions));
            ////console.log("Today: " + today);
            today = replaceAll('/', ' ', today);
            ////console.log('Month: ' + month.toString());
            today = today.replace(month.toString(), "DAY");
            today = today.replace(day.toString(), "MONTH");
            ////console.log("Today: " + today);
            
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            today = today.replace("MONTH", months[month - 1]);
            today = today.replace("DAY", day.toString());
}
