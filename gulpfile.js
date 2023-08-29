const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const server = require('gulp-server-livereload');

// Компиляция SCSS в CSS
gulp.task('sass', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

// Включение файлов
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(gulp.dest('./dist'));
});

// Запуск сервера с автоматической перезагрузкой
gulp.task('server', function() {
  return gulp.src('./dist')
    .pipe(server({
      livereload: true,
      open: true,
    }));
});

// Слежение за изменениями файлов
gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
});

// Запуск сборки и сервера
gulp.task('default', gulp.series(
  gulp.parallel('sass', 'html'),
  gulp.parallel('server', 'watch')
));

