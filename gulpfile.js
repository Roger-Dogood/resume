/* jslint node: true */
/*jslint todo: true */
'use strict';

var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    glob        = require('glob'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sass        = require('gulp-ruby-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    uglify      = require('gulp-uglify'),
    minifyHTML  = require('gulp-minify-html'),
    jsonMinify  = require('gulp-jsonminify'),
    concat      = require('gulp-concat'),
    reload      = browserSync.reload;

var env,
    devDir,
    outputDir;

env = process.env.NODE_ENV || 'development';

devDir = './builds/development/';
outputDir = './builds/production/';


gulp.task('index', function () {
    return gulp.src(devDir + '*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(outputDir));
});

gulp.task('resume', function () {
    return gulp.src(devDir + 'resume/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(outputDir + 'resume'));
});

gulp.task('js', function () {
    var entry = glob.sync(devDir + 'js/*.js'),

        // set up the browserify instance on a task basis
        b = browserify({
            entries: entry,
            extensions: ['.js'],
            debug: true,
            // defining transforms here will avoid crashing your stream
            // transform: [browserify]
        });

    return b.bundle()
        .pipe(source(devDir + 'js/template.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(concat('script.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('json', function () {
    return gulp.src(devDir + 'js/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest(outputDir + 'js'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return sass(devDir + 'scss/style.scss', {
        style: 'compressed',
        sourcemap: true
    })
            .on('error', gutil.log)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(reload({stream: true}));
});

// TODO: Figure out what's wrong with my watch task.
gulp.task('watch', function () {
    gulp.watch(devDir + 'js/*.js', ['js']).on('change', reload);
    gulp.watch(devDir + 'js/*.json', ['json']).on('change', reload);
    gulp.watch(devDir + 'scss/*.scss', ['sass']);
    gulp.watch(devDir + 'resume/**/*.html', ['resume']).on('change', reload);
    gulp.watch(devDir + '*.html', ['index']).on('change', reload);
});

// Static Server
gulp.task('serve', function () {
    browserSync({
        server: outputDir
    });
});

gulp.task('default', ['index', 'resume', 'js', 'json', 'sass', 'watch', 'serve']);
