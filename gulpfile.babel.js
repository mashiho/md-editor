import gulp from 'gulp';
import webpack from 'gulp-webpack';
const config = require('./webpack.config.js');
const electron = require('electron-connect').server.create();


gulp.task('build', () => {
  return gulp.src('')
  .pipe(webpack(config))
  .pipe(gulp.dest(''));
});

gulp.task('start', () => {
  electron.start();
});

gulp.task('watch', () => {
  gulp.watch(['main.js', 'containers/**/*.js', 'components/**/*.js', 'models/**/*.js'], ['build', electron.restart]);
  gulp.watch('style.css', electron.reload);
});

gulp.task('default', ['build', 'start', 'watch']);
