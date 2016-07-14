// Karma configuration
// Generated on Tue Jul 05 2016 16:21:32 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '/Users/audrey/Personal/Programming/Workspace/LearnOLL/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [/*'mocha',*/'jasmine'],

    /*plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-jasmine-spec-runner-reporter'
    ],*/

    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'app/app.module.js',
      'app/app.config.js',
      'app/*.js', /*{
            pattern: 'app/*.spec.js', included: false},*/
      'app/**/*.js', {
               pattern: 'app/**/*.spec.js', included: false},
      'tests/*.js', {
            pattern: 'tests/*.spec.js', included: true},
	  'spec-runner-template.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'spec-runner-template.html':['ng-html2js'],
		//'app/*.js':['coverage'],
                //'app/**/*.js':['coverage'],
                'app/**/!(*.mock|*.spec).js':'coverage',
                'app/!(*.mock|*.spec).js':'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'coverage', 
      'progress',
      'junit',
      'jasmine-spec-runner'
    ],
    
    junitReporter: {
      outputDir: 'junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: (new Date()).toTimeString(), // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },

    jasmineSpecRunnerReporter: {
      jasmineCoreDir: 'node-modules/jasmine-core'
    },

    coverageReporter: {
      type: 'lcov',
      //type: 'text',
      dir: 'coverage/lcov/',
      //file: '',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DISABLE,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    //autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],// 'PhantomJS_Custom'],
    
   /* customLaunchers: {
      'PhantomJS_Custom': {
        base: 'PhantomJS',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          }
        },
        flags: ['--load-images=true'],
        debug: false
      }
    },*/

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    //singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    //concurrency: Infinity
  })
}
