/*
 * node-motion
 * https://github.com/j3lte/node-motion
 *
 * Copyright (c) 2015 Jelte Lagendijk
 * Licensed under the MIT license.
 */
'use strict';
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var clean = require('gulp-clean');

var commands = {
  docs: [
    'echo "## Output chanarchive\n" > ./docs/cli.md;',
    'echo "\\\`\\\`\\\`" >> ./docs/cli.md;',
    'node ./cli.js -h >> ./docs/cli.md;',
    'echo "\\\`\\\`\\\`" >> ./docs/cli.md;'
  ],
  shrinkwrap: [
    'npm-shrinkwrap --silent'
  ]
};

var srcFiles = [
  './Gulpfile.js',
  './cli.js',
  './config/*.js',
  './motion/*.js',
  './server/*.js'
];

gulp.task('clean', function () {
  return gulp.src('npm-shrinkwrap.json', {read: false})
    .pipe(clean());
});

gulp.task('lint', function() {
  return gulp.src(srcFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('shell:docs', function () {
  return gulp.src('./cli.js', {read: false})
    .pipe(shell(commands.docs));
});

gulp.task('shell:shrinkwrap', ['clean'], function () {
  return gulp.src('./package.json', {read: false})
    .pipe(shell(commands.shrinkwrap));
});

gulp.task('default', ['lint']);

gulp.task('watch', function() {
  gulp.watch(srcFiles, ['lint']);
});

gulp.task('build', ['lint', 'shell:docs', 'shell:shrinkwrap']);
