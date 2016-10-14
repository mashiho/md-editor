import babelify from 'babelify';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';

// TODO: エラーをキャッチしたときにログを出すようにする
gulp.task('build', () => {
  watchify(browserify({ entries: ['app.js'] }))
  .transform(babelify)
  .bundle()
  .pipe(plumber())
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', () => {
  gulp.watch(['app.js', 'main.js', 'components/**/*.js'], ['build']);
});

gulp.task('default', ['build', 'watch']);
