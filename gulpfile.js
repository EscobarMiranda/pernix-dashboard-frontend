// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var jscs = require('gulp-jscs');
var less = require('gulp-less');
var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var exec = require('child_process').exec;

require('gulp-grunt')(gulp);


// Check code syntax
gulp.task('review', function() {
  return gulp.src(['app/components/**/*.js', 'test/spec/**/*.js'])
  .pipe(jscs())
  .pipe(jscs.reporter());
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('minify-scripts', function() {
  return gulp.src(['./app/components/app.module.js',
    './app/components/**/!(*app).module.js',
    './app/components/**/*.js',
    '!app/components/**/*.test.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Move node_modules
gulp.task('move-node-modules', function() {
  return gulp.src(['./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
   './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'])
    .pipe(gulp.dest('dist/vendor/js'))
});

// Move bower_components
gulp.task('move-bower-components', function() {
  gulp.src(['./bower_components/jquery/dist/jquery.min.js',
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/firebase/firebase.js',
    'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
    './bower_components/angularfire/dist/angularfire.min.js',
    './bower_components/angular-messages/angular-messages.min.js'])
    .pipe(gulp.dest('dist/vendor/js'));

  gulp.src('./bower_components/bootstrap/fonts/*.*')
    .pipe(gulp.dest('dist/vendor/fonts'));

  return gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'])
    .pipe(gulp.dest('dist/vendor/css'));
});

// CSS
gulp.task('minify-styles', function() {
  return gulp.src(['./app/assets/styles/*.css'])
    .pipe(minifyCSS({comments:true, spare:true}))
    .pipe(gulp.dest('dist/css'));
});

// Runs library npm lite server
gulp.task('runLiteServer', function () {
  exec('npm run dev', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


// Fill index
gulp.task('build-index', function() {
  var target = gulp.src('index.html');
  var sources = gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
    'bower_components/paper/dist/paper-core.min.js',
    './app/components/app.module.js',
    './app/components/app.*.js',
    './app/components/**/*.module.js',
    './app/components/**/*.js',
    './app/assets/styles/*.css',
    'bower_components/angular-toastr/dist/angular-toastr.css'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(''));

});


// Move Images
gulp.task('move-images', function() {
  return gulp.src('./app/images/*')
    .pipe(gulp.dest('dist/app/images'));
});

// Move Index
gulp.task('move-index', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

// Move html
gulp.task('move-html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/app'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['lint', 'review', 'build-index']);
  gulp.watch('assets/stylesheets/**/*.css', ['build-index']);
});

// Remove build folder
gulp.task('clean', function() {
  gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('clean-less', function() {
  gulp.src('./app/components/stein.css')
    .pipe(clean({force: true}));
})


gulp.task('less', function () {
  return gulp.src('./app/components/**/*.less')
    .pipe(less())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./app/assets/styles'));
});

gulp.task('watch-less', function() {
  gulp.watch('app/components/**/*.less', ['less']);  
});

gulp.task('run', [
  'clean-less',
  'less',
  'build-index',
  'review',
  'watch-less',
  'runLiteServer'
  ])

// Default Task
gulp.task('default', ['lint', 'review', 'build-index', 'watch']);

gulp.task('build', function() {
  runSequence(
    ['clean'],
    ['lint', 'review', 'build-index']
    );
});

gulp.task('build-production', ['move-index', 'move-node-modules', 'move-bower-components',
  'minify-styles', 'minify-scripts', 'move-images', 'move-html'], function() {

    var target = gulp.src('./dist/index.html');
    var sources = gulp.src(['./vendor/js/angular.js',
      './vendor/js/ui-bootstrap.js',
      './vendor/js/**/*.js',
      './vendor/css/**/*.css',
      './all.js',
      './css/*.css'], {read: false, cwd: __dirname + '/dist'});

    return target.pipe(inject(sources))
      .pipe(gulp.dest('./dist'));

});
