var config = require('../config');
var gulp   = require('gulp');

gulp.task('watch', ['browserify', 'browser-sync'], function() {
  gulp.watch(config.views.src, ['views']);
  gulp.watch(config.styles.src, ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch([config.browserify.src, config.template.src], ['browserify']);
});