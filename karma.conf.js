module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-cookies/angular-cookies.js',
      './bower_components/angular-messages/angular-messages.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-touch/angular-touch.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/firebase/firebase.js',
      './bower_components/angularfire/dist/angularfire.js',
      './bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './app/components/**/*.module.js',
      './app/components/**/*.js',
      './app/components/*.js',
      './test/spec/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {
        './app/components/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
    },


    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
};
