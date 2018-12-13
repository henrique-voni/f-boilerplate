const gulp = require('gulp');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


gulp.task('serve', () => {

  browserSync.init({
    server: 'dist'
  });

  gulp.watch('src/sass/**/*.scss', gulp.series('style'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('dist/*.html').on('change', browserSync.reload);

});

gulp.task('style', () => {
  return gulp.src('src/sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./dist/css/'))
          .pipe(browserSync.stream());
});

// Don't forget to add JS scripts here as you create new ones.
const scriptsSRC = ['src/js/index.js'];

gulp.task('js', () => {
  return browserify({
    entries: scriptsSRC,
    debug: true,
  })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


gulp.task('default', gulp.series('serve'));