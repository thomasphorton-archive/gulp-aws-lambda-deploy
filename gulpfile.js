var fs = require('fs');
var path = require('path');

var clean = require('gulp-clean');
var debug = require('gulp-debug');
var gulp = require('gulp');
var lambda = require('gulp-awslambda');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var zip = require('gulp-zip');

var runSequence = require('run-sequence').use(gulp);

var settings = {
  src: 'src',
  tmp: 'tmp',
  functionName: 'test-function',
  roleARN: 'arn:aws:iam::<role ARN>'
}

gulp.task('default', function() {
  runSequence(
    'copy',
    'install',
    'deploy',
    'clean'
  );
});

// Move module to temporary directory
gulp.task('copy', function() {
  var src = path.join(settings.src, '*', '*');

  return gulp.src(src, {base: settings.src})
    .pipe(gulp.dest(path.join('.', settings.tmp)))
});

// Install dependencies
gulp.task('install', function() {
  return gulp.src(settings.tmp + '/*')
    .pipe(shell([
      'cd <%= file.path %> && npm install',
    ]))
});

// Zip file and deploy to S3
gulp.task('deploy', function() {
  var dest = path.join(settings.functionName + '.zip');
  var lambdaParams = {
    FunctionName: settings.functionName,
    Role: settings.roleARN
  };

  return gulp.src(path.join(settings.tmp, settings.functionName, '**', '*'))

    // Zip the temporary directory
    .pipe(zip(dest))

    // Deploy the zipped package
    .pipe(lambda(lambdaParams))
});

// Delete temporary files
gulp.task('clean', function() {
  return gulp.src(settings.tmp + '/', {read: false})
    .pipe(clean());
});