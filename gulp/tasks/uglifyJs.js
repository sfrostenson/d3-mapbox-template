var gulp    = require('gulp');
var config  = require('../config').build;
var size    = require('gulp-filesize');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');

gulp.task('uglifyJs', function() {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});