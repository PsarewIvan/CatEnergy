const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const image = require('gulp-image');
const webp = require('gulp-webp');
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

function images() {
  return gulp.src('source/img/picture/*.{jpg,png}')
              .pipe(image())
              .pipe(gulp.dest('build/img/picture'))
}

function webpConvert() {
  return gulp.src('source/img/picture/*.{jpg,png}')
              .pipe(webp({
                quality: 85,
                method: 5
              }))
              .pipe(gulp.dest('build/img/webp'))
}

function clean() {
  return del(['build/*', '!build/img', '!build/fonts']);
}

function cleanImg() {
  return del(['build/img/*', '!build/img/icon']);
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
gulp.task('images', images);
gulp.task('webpConvert', webpConvert);
gulp.task('watch', watch);

gulp.task('buildImg', gulp.series(cleanImg,
                        gulp.parallel(images, webpConvert)
                      ));

gulp.task('build', gulp.series(clean,
                      gulp.parallel(html, styles, scripts)
                    ));

gulp.task('dev', gulp.series('build', watch));
