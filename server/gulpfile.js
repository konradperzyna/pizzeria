/*jshint node:true */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
    //streams = require('stream-series'),
    //angularFilesort = require('gulp-angular-filesort'),
    //browserify = require('browserify'),
    //source = require('vinyl-source-stream'),
    ngAnnotate = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint');


gulp.task('jshint', function() {
    gulp.src(['./**/*.js', '!node_modules/**/*'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(jshint.reporter('fail'))
        ;
});

gulp.task('watch', function() {
    gulp.watch(['./**/*.js', '!node_modules/**/*', '!gulpfile.js', './**/*.html', 'css/*.css'], copy_dev)
});

gulp.task('clean', function () {
  return del([
    '../build/**', '!../build'
  ], {force: true});
});


function copy_dev() {
     var angularStream = gulp.src(['node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js']).pipe(gulp.dest('../build/lib/'));
     var jsStream = gulp.src(['./**/*.js', '!node_modules/**/*', '!gulpfile.js']).pipe(gulp.dest('../build/'));
     var cssStream = gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
     gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build/'));
     gulp.src('index.html')
         .pipe(inject(es.merge([angularStream, jsStream, cssStream]), {ignorePath: '../build/'}))
         .pipe(gulp.dest('../build/'));
}

gulp.task('build:dev', ['clean'], copy_dev);


gulp.task('build:prod', ['clean'], function() {
    var jsStream = gulp.src([ 'node_modules/angular/angular.js', 'node_modules/angular-ui-router/release/angular-ui-router.js', 
                                './**/*.js', '!gulpfile.js', '!node_modules/**/*'])
        .pipe(sourcemaps.init())
        .pipe(concat('pizzeria.js'))
        // //TODO: uglify destroys angular injection system?
        // .pipe(ngAnnotate(
        //     {
        //     // true helps add where @ngInject is not used. It infers.
        //     // Doesn't work with resolve, so we must be explicit there
        //     add: true
        //     }
        // ))        
    	// .pipe(uglify())
        .pipe(sourcemaps.write('../build/'))
        .pipe(gulp.dest('../build/'));
    var cssStream = gulp.src('css/*.css').pipe(gulp.dest('../build/css/'));
    gulp.src(['./**/*.html', '!index.html', '!node_modules/**/*']).pipe(gulp.dest('../build/'));
    gulp.src('index.html').pipe(inject(es.merge(jsStream, cssStream), {ignorePath: '../build/'})).pipe(gulp.dest('../build/'));
});
