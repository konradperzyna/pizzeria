/*jshint node:true */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-rimraf'),
    jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    gulp.src(['*.js', 'js/*.js', 'data/*.js', 'lib/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        ;
});


gulp.task('clean', function() {
    gulp.src('../build/*', { read: false }).pipe(clean({force: true}));
});


gulp.task('build:dev', ['clean'], function() {
    gulp.src(['*.js', '!gulpfile.js']).pipe(gulp.dest('../build/'));
    gulp.src('js/*.js').pipe(gulp.dest('../build/js/'));
    gulp.src('data/*.js').pipe(gulp.dest('../build/data/'));
    gulp.src('lib/*.js').pipe(gulp.dest('../build/lib/'));
    gulp.src('*.html').pipe(gulp.dest('../build/'));
    gulp.src('partials/*.html').pipe(gulp.dest('../build/partials/'));
    gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
});


gulp.task('build:prod', ['clean'], function() {
    gulp.src(['*.js', 'js/*.js', 'data/*.js', 'lib/*.js', '!gulpfile.js'])
        .pipe(concat('pizzeria.js'))
	.pipe(uglify())
	.pipe(gulp.dest('../build/'));
    gulp.src('*.html').pipe(gulp.dest('../build/'));
    gulp.src('partials/*.html').pipe(gulp.dest('../build/partials/'));
    gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
});

