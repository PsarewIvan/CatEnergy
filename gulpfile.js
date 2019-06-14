const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const rigger = require('gulp-rigger');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');

const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');

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

const path = {
  build: {
    root: 'build/',
    html: 'build/',
    js: 'build/js/',
    style: 'build/css/',
    img: 'build/img/picture',
    imgWebp: 'build/img/webp/',
    fonts: 'build/fonts/',
    svg: 'build/img/icon/',
    svgSprite: 'build/svg/'
  },
  source: {
    html: 'source/*.html',
    js: 'source/js/main.js',
    style: 'source/less/main.less',
    img: 'source/img/picture/*.{jpg,png}',
    fonts: 'source/fonts/**/*.{woff,woff2}',
    svg: 'source/img/icon/**/*.svg',
    svgSprite: 'source/img/sprite/*.svg'
  },
  watch: {
    html: 'source/*.html',
    js: 'source/js/**/*.js',
    style: 'source/less/**/*.less',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.{woff,woff2}'
  },
  clean: {
    all: 'build/*',
    noImg: '!build/img',
    img: 'build/img/*'
  }
};

function html() {
  return gulp.src(path.source.html)
              .pipe(rigger())
              .pipe(posthtml([
                include()
              ]))
              .pipe(htmlmin({ collapseWhitespace: true }))
              .pipe(gulp.dest(path.build.html))
              .pipe(browserSync.stream());
}

function styles() {
  return gulp.src(path.source.style)
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
              .pipe(gulp.dest(path.build.style))
              .pipe(browserSync.stream());
}

function fontsCopy() {
  return gulp.src(path.source.fonts, {
                base: 'source'
              })
              .pipe(gulp.dest(path.build.root));
}

function scripts() {
  return gulp.src(path.source.js)
              .pipe(rigger())
              .pipe(plumber())
              .pipe(sourcemaps.init())
              .pipe(babel({
                presets: ['@babel/env']
              }))
              .pipe(uglify({
                toplevel: true
              }))
              .pipe(sourcemaps.write())
              .pipe(rename('script-min.js'))
              .pipe(sourcemaps.write())
              .pipe(gulp.dest(path.build.js))
              .pipe(browserSync.stream());
}

function images() {
  return gulp.src(path.source.img)
              .pipe(image())
              .pipe(gulp.dest(path.build.img))
}

function webpConvert() {
  return gulp.src(path.source.img)
              .pipe(webp({
                quality: 85,
                method: 5
              }))
              .pipe(gulp.dest(path.build.imgWebp))
}

function svgMin() {
  return gulp.src(path.source.svg)
              .pipe(svgmin({
                js2svg: {
                  pretty: true  // убирает лишние пробелы
                }
              }))
              .pipe(cheerio({
                run: function ($) {  // удаляет ненужные атрибуты
                  $('[fill]').removeAttr('fill');
                  $('[stroke]').removeAttr('stroke');
                  $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
              }))
              .pipe(replace('&gt;', '>'))  // исправляет баг cheerio по замене '>'
              .pipe(gulp.dest(path.build.svg));
}

function createSvgSprite() {
  return gulp.src(path.source.svgSprite)
              .pipe(svgmin({
                js2svg: {
                  pretty: true  // убирает лишние пробелы
                }
              }))
              .pipe(cheerio({
                run: function ($) {  // удаляет ненужные атрибуты
                  $('[fill]').removeAttr('fill');
                  $('[stroke]').removeAttr('stroke');
                  $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
              }))
              .pipe(replace('&gt;', '>'))  // исправляет баг cheerio по замене '>'
              .pipe(svgSprite({
                // svg: {
                //   xmlDeclaration: true,
                //   doctypeDeclaration: false
                // },
                mode: {
                  symbol: {
                    sprite: "../sprite.svg"
                  }
                }
              }))
              .pipe(gulp.dest(path.build.svgSprite));
}

function clean() {
  return del([path.clean.all, path.clean.noImg]);
}

function cleanImg() {
  return del([path.clean.img]);
}

function watch() {
  browserSync.init({
    server: 'build'
  });

  gulp.watch(path.watch.style, styles);
  gulp.watch(path.watch.js, scripts);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.fonts, fontsCopy);
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
