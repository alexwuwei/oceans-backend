'use strict';

let gulp = require('gulp');
let mocha = require('gulp-mocha');

var paths = ['*.js', 'models/*.js', 'routes/*.js', 'test/*.js'];

gulp.task('test', () => {
  gulp.src(__dirname + '/test/*.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', () => {
  gulp.watch(paths);
});

gulp.task('default', ['test']);
