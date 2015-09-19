var gulp = require('gulp');

var jshint = require('gulp-jshint')
var browserify = require('browserify');
var gulputil = require('gulp-util');
var sourceStream = require('vinyl-source-stream');
var buffer = require("vinyl-buffer");

gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function(){
	return browserify('js/main.js')
		.bundle()
		.pipe(sourceStream('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('js'));
});

gulp.task('watch', function(){
	gulp.watch(['./js/**/*.js', '!./js/app.js'], ['js']);

});

gulp.task('default', ['js', 'watch', 'jshint']);
