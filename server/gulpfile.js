/*jshint node:true */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    jshint = require('gulp-jshint');


gulp.task('jshint', function() {
    gulp.src(['*.js', 'js/*.js', 'data/*.js', 'lib/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        ;
});

gulp.task('watch', function() {
    gulp.watch(['*.js', 'js/*.js', 'data/*.js', 'lib/.*js', '!gulpfile.js', '*.html', 'partials/*.html', 'css/*.css'], copy_dev)
})

gulp.task('clean', function () {
  return del([
    '../build/**', '!../build'
  ], {force: true});
});


function copy_dev() {
    gulp.src(['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest('../build/lib/'));
    gulp.src(['*.js', '!gulpfile.js']).pipe(gulp.dest('../build/'));
    gulp.src('js/*.js').pipe(gulp.dest('../build/js/'));
    gulp.src('data/*.js').pipe(gulp.dest('../build/data/'));
    gulp.src('*.html').pipe(gulp.dest('../build/'));
    gulp.src('partials/*.html').pipe(gulp.dest('../build/partials/'));
    gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));

}


gulp.task('build:dev', ['clean'], copy_dev);


gulp.task('build:prod', ['clean'], function() {
    gulp.src(['*.js', 'js/*.js', 'data/*.js', '!gulpfile.js', 'node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js'])
        .pipe(concat('pizzeria.js'))
	.pipe(uglify())
	.pipe(gulp.dest('../build/'));
    gulp.src('*.html').pipe(gulp.dest('../build/'));
    gulp.src('partials/*.html').pipe(gulp.dest('../build/partials/'));
    gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
});
