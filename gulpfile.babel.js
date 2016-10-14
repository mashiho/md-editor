import babelify from 'babelify';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';

// TODO: エラーをキャッチしたときにログを出すようにする
gulp.task('build', () => {
  watchify(browserify({ entries: ['app.js'] }))
  .transform(babelify)
  .bundle()
  .pipe(plumber())
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public'));
});

/**
 * ブラウザ動作確認用タスク
 * NOTE: 現状はChrome等のブラウザでしか確認できない。
 * TODO: Electronでも動くようにしたい
 */
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: '',
    },
  });

  gulp.watch(['app.js', 'main.js', 'components/**/*.js'], () => {
    browserSync.reload();
  });
});

gulp.task('watch', () => {
  gulp.watch(['app.js', 'main.js', 'components/**/*.js'], ['build']);
});

gulp.task('default', ['build', 'watch']);
