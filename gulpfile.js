const gulp       = require('gulp'),
      sass       = require('gulp-sass'),
      inject     = require('gulp-inject'),
      bs         = require('browser-sync').create();

var sources = gulp.src(['./public/styles/**/*.css'], {read: false});

gulp.task('browser-sync', ['sass'], () => {
  bs.init({
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss')
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest('./public/styles'))
             .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['fonts', 'browser-sync'], () => {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./public/scripts/**/*.js').on('change', bs.reload);
  gulp.watch('./public/**/*.html').on('change', bs.reload);
});

gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/*')
             .pipe(gulp.dest('public/fonts'));
});
