const gulp = require('gulp');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

gulp.task('serve', () => {

  browserSync.init({
    server: './'
  });

  gulp.watch('src/sass/*.scss', gulp.series('style'));
  gulp.watch('*.html').on('change', browserSync.reload);

});

gulp.task('style', () => {
  return gulp.src('src/sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./dist/css/'))
          .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('serve'));