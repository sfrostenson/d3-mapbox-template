var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync');
var config      = require('../config').browserSync;
var evt         = browserSync.emitter;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: config.dest
        }
    });
    evt.on("init", function () {
      gutil.log(gutil.colors.green('BrowserSync initialized...'));
    });
});