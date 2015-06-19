var eslint = require('gulp-eslint');
var gulp   = require('gulp');

var srcFiles = [
    './cli.js',
    './config/*.js',
    './motion/*.js',
    './server/*.js',
];

gulp.task('lint', function() {
  return gulp.src(srcFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', ['lint']);

gulp.task('watch', function() {
    gulp.watch(srcFiles, ['lint']);
});