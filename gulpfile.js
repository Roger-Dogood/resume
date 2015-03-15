var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    browserify  = require('gulp-browserify'),
    compass     = require('gulp-compass'),
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

devDir = 'builds/development/';
outputDir = 'builds/production/';



gulp.task('index', function() {
    return gulp.src(devDir + '*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(outputDir));
});

gulp.task('resume', function() {
    return gulp.src(devDir + 'resume/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(outputDir + 'resume'));
});

gulp.task('js', function() {
    return gulp.src(devDir + 'js/*.js')
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('json', function() {
    return gulp.src(devDir + 'js/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest(outputDir + 'js'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('compass', function() {
    return gulp.src(devDir + 'scss/style.scss')
        .pipe(compass({
            sass: devDir + 'scss/',
            image: outputDir + 'images',
            style: 'compressed'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
    gulp.watch(devDir + 'js/*.js', ['js']).on('change', reload);
    gulp.watch(devDir + 'js/*.json', ['json']).on('change', reload);
    gulp.watch(devDir + 'scss/**/*.scss', ['compass']);
    gulp.watch(devDir + 'resume/**/*.html', ['resume']).on('change', reload);
    gulp.watch(devDir + '*.html', ['index']).on('change', reload);
});

// Static Server
gulp.task('serve', function() {

    browserSync({
        server: outputDir
    });
});

gulp.task('default', ['index', 'resume', 'js', 'json', 'compass', 'watch', 'serve']);
