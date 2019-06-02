const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');

const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const rename = require('gulp-rename');
const del = require('del');

const image = require('gulp-image');
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');

const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const ghpages = require('gh-pages');

function html() {
  return gulp.src('source/*.html')
              .pipe(posthtml([
                include()
              ]))
              .pipe(gulp.dest('build'))
              .pipe(browserSync.stream());
}

function styles() {
  return gulp.src('source/less/main.less')
              .pipe(plumber())
              .pipe(sourcemaps.init())
              .pipe(less())
              .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
              }))
              .pipe(cleanCSS({level: 2}))
              .pipe(rename({suffix: "-min"}))
              .pipe(sourcemaps.write())
              .pipe(gulp.dest('build/css'))
              .pipe(browserSync.stream());
}

function fontsCopy() {
  return gulp.src('source/fonts/**/*.{woff,woff2}', {
                base: 'source'
              })
              .pipe(gulp.dest('build'));
}

function scripts() {
  return gulp.src('source/js-source/**/*.js')
              .pipe(plumber())
              // .pipe(babel({
              //   presets: ['@babel/env']
              // }))
              .pipe(concat('script.js'))
              // .pipe(uglify({
              //   toplevel: true
              // }))
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

function svgMin() {
  return gulp.src('source/img/icon/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/img/icon'));
}

function createSvgSprite() {
  return gulp.src('source/img/icon/*.svg')
              .pipe(svgSprite({
                mode: {
                  stack: {
                    sprite: "../sprite.svg"
                  }
                },
              }))
              .pipe(gulp.dest('build/svg/'));
}

function clean() {
  return del(['build/*', '!build/img']);
}

function cleanImg() {
  return del(['build/img/*']);
}

function watch() {
  browserSync.init({
    server: 'build'
  });

  gulp.watch('source/less/**/*.less', styles);
  gulp.watch('source/js-source/**/*.js', scripts);
  gulp.watch('source/*.html', html);
  gulp.watch('source/fonts/**/*.{woff,woff2}', fontsCopy);
}

gulp.task('html', gulp.series(createSvgSprite, html));
gulp.task('styles', styles);
gulp.task('fonts', fontsCopy);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('svgMin', svgMin);
gulp.task('webpConvert', webpConvert);
gulp.task('watch', watch);

gulp.task('buildImg', gulp.series(cleanImg,
                        gulp.parallel('images', 'svgMin', 'webpConvert')
                      ));

gulp.task('buildNoImg', gulp.series(clean,
                      gulp.parallel('html', 'styles', 'fonts', 'scripts')
                    ));

gulp.task('dev', gulp.series(clean, cleanImg,
                    gulp.parallel('html', 'styles', 'fonts', 'scripts', 'images', 'webpConvert'),
                    watch));

ghpages.publish('build');
