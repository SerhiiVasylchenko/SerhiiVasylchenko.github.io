'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    minifyjs = require('gulp-js-minify'),
    cleanCSS = require('gulp-clean-css'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: '',
        js: 'assets/js/',
        css: 'assets/css/',
        fonts: 'assets/fonts/',
        img: 'assets/media/img/'
    },
    src: {
        html: 'src/html/*.html',
        js: 'src/assets/js/*.js',
        css: 'src/assets/css/*.css',
        fonts: 'src/assets/fonts/**/*.*',
        img: 'src/assets/img/**/*.*'
    },
    watch: {
        html: 'src/html/**/*.html',
        css: 'src/assets/css/*.css',
        js: 'src/assets/js/**/*.js',
        fonts: 'src/assets/fonts/**/*.*',
        img: 'src/assets/img/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "/"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_:"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(minifyjs())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });

    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });

    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });

    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);
