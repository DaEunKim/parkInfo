'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
// var sassLint = require('gulp-sass-lint');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var cssVersioner = require('gulp-css-url-versioner');
var rev = require('gulp-rev-append');



var config = {
    browsers: [
        'last 2 versions',
        'safari 5',
        'ie 7-11',
        'opera 12.1',
        'ios 6',
        'android 4'
    ]
}

// css urlversion
// gulp.task('styles', async function () {
//     return gulp.src('./src/css/*.css')
//         .pipe(cssVersioner())
//         .pipe(gulp.dest('./src/css'));
// });

// sass
gulp.task('sass', async function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssVersioner({lastcommit: true}))
        .pipe(autoprefixer(config))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('rev', async function() {
    // console.log('test');
  gulp.src("../index.html")
    .pipe(rev())
    .pipe(gulp.dest('../'))
});

// sprite smith
gulp.task('sprite', async function () {
    var spriteData = gulp.src('./src/images/sprites/*.png')
        .pipe(spritesmith({
            imgName: '../images/sprite.png',
            cssName: 'sprite.scss',
            padding: 2
        }));
    spriteData.img.pipe(gulp.dest('./src/images'));
    spriteData.css.pipe(gulp.dest('./src/scss/common'));
});

// html browser sync
gulp.task('html', function() {
    return gulp.src('./**/*.html')
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('browserSync', gulp.series('html', function(){
    return browserSync.init({
        port: 3333,
        server: {
            baseDir: '../'
        }
    });
}));

// watch
gulp.task('watch', async function() {
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/images/sprites/**/*', gulp.parallel('sprite'));
    gulp.watch('./src/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.css', gulp.parallel('rev'));
});

// all task
gulp.task('start', gulp.parallel('browserSync', 'sprite', 'watch'));