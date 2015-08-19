var gulp          = require('gulp');
var config        = require('../config').views;
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

gulp.task('views', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});