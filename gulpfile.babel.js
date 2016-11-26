import gulp from 'gulp';
import webpack from 'gulp-webpack';
const config = require('./webpack.config.js');

gulp.task('build', () => {
  return gulp.src('')
  .pipe(webpack(config))
  .pipe(gulp.dest(''));
});

gulp.task('watch', () => {
  gulp.watch(['main.js', 'containers/**/*.js', 'components/**/*.js', 'models/**/*.js'], ['build']);
});

gulp.task('default', ['build', 'watch']);
