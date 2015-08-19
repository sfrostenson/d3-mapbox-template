var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var config        = require('../config').styles;
var handleErrors  = require('../util/handleErrors');
var rename        = require('gulp-rename');

gulp.task('sass', function () {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(rename(config.outputName))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(reload({stream:true}));
});