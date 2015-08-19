var gulp        = require('gulp');
var browserify  = require('browserify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var watchify    = require('watchify');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var jstify      = require('jstify');
var config      = require('../config').browserify;
var handleErrors = require('../util/handleErrors');

/**
 * probably should figure out how to
 * setup a config here
 *
 * watchify runs even on 'build' task
 */

gulp.task('browserify', function(){
  browserifyTask('./src/js/app.js');
});

var browserifyTask = function(filename) {

  browserify({ debug: true })
    .add(filename)
    .transform('jstify', {engine: 'lodash'})
    .bundle()
    .on('error', handleErrors)
    .pipe(source(config.outputName))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
    
};