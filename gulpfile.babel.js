import babelify from 'babelify';
import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

gulp.task('build', () => {
  browserify({ entries: ['./index.js'] })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public'));
});
