const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('source/*.html')
              .pipe(gulp.dest('build'))
              .pipe(browserSync.stream());
}

function styles() {
  return gulp.src('source/less/main.less')
              .pipe(less())
              .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
              }))
              .pipe(cleanCSS({level: 2}))
              .pipe(rename({suffix: "-min"}))
              .pipe(gulp.dest('build/css'))
              .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('source/js-source/**/*.js')
              .pipe(concat('script.js'))
              .pipe(uglify({
                toplevel: true
              }))
              .pipe(rename({suffix: "-min"}))
              .pipe(gulp.dest('build/js'))
              .pipe(browserSync.stream());
}

function clean() {
  return del(['build/*', '!build/img']);
}

function watch() {
  browserSync.init({
    server: 'build'
  });

  gulp.watch('source/less/**/*.less', styles);
  gulp.watch('source/js-source/**/*.js', scripts);
  gulp.watch('source/*html', html);
}

gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,
                      gulp.parallel(html, styles, scripts)
                    ));

gulp.task('dev', gulp.series('build', watch));
