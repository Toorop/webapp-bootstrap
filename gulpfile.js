'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');




gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(express.static(__dirname+"/dist/"));
  app.listen(4000);
});


// update components
gulp.task('bower', function() {
  bower({ cmd: 'update'}).pipe(gulp.dest('bower_components'));
  // jquery
  gulp.src('bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/static/js'));
  gulp.src('bower_components/jquery/dist/jquery.min.map').pipe(gulp.dest('dist/static/js'));
  // bootstrap
  gulp.src('bower_components/bootstrap/dist/js/boostrap.min.js').pipe(gulp.dest('dist/static/js'));
  gulp.src('bower_components/bootstrap/dist/fonts/*').pipe(gulp.dest('dist/static/fonts'));
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('dist/static/css'));
  gulp.src('bower_components/bootstrap/dist/css/bootstrap.css.map').pipe(gulp.dest('dist/static/css'));
  gulp.src('bower_components/bootstrap/dist/css/bootstrap-theme.min.css').pipe(gulp.dest('dist/static/css'));
  gulp.src('bower_components/bootstrap/dist/css/bootstrap-theme.css.map').pipe(gulp.dest('dist/static/css'));
});


// Compress
gulp.task('compress', function() {
  gulp.src('dev/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/static/css'));
  gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/static/js'));
  return;
});

// Default
gulp.task('default', ['compress'], function() {
  gulp.src('dev/*.html').pipe(gulp.dest('dist')).pipe(livereload());
  return
});

// Watch
gulp.task('watch', ['express'], function() {
  livereload.listen();
  gulp.watch('dev/**', ['default']);
});





