/**
 * @description builds up frontend
 */

const gulp = require('gulp'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  myth = require('gulp-myth'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  modifyCssUrls = require('gulp-modify-css-urls'),
  browserify = require('gulp-browserify');

gulp.task('stylus', () => {
  gulp.src('./src/css/*.css')
    .pipe(stylus({
      use: ['nib']
    }))
    .on('error', console.log)
    .pipe(myth())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('stylus-lib', () => {
  gulp.src([
    './src/libs/font-awesome/css/font-awesome.css',
    './src/libs/MDBootstrap/css/bootstrap.min.css',
    './src/libs/MDBootstrap/css/mdb.min.css'

  ])
    .pipe(concat('lib.css'))
    .pipe(modifyCssUrls({
      modify: (url, filePath) => {
        console.log(url);
        return url.replace(new RegExp(/(\.\.)\//, 'g'), '')
          .replace('font/', 'fonts/');
      }
    }))
    .pipe(gulp.dest('./dist/libs/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('fonts', () => {
  gulp.src('./src/css/fonts/*')
    .pipe(gulp.dest('./dist/css/fonts'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('fonts-lib', () => {
  gulp.src([
    './src/libs/font-awesome/fonts/*',
    './src/libs/MDBootstrap/font/**/*'
  ])
    .pipe(gulp.dest('./dist/libs/fonts'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', () => {
  gulp.src([
    './src/js/**/*.js',
    './src/js/*.js'
  ])
    .pipe(babel({
      presets: [
        ['es2015', {modules: false}]
      ],
      compact: false
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task("libs", () =>
  gulp.src([
    './src/libs/MDBootstrap/js/jquery-3.1.1.min.js',
    './src/libs/MDBootstrap/js/tether.min.js',
    './src/libs/MDBootstrap/js/bootstrap.min.js',
    './src/libs/MDBootstrap/js/mdb.js',
    './src/libs/lodash/dist/lodash.js',
    './src/libs/vue/dist/vue.min.js',
    './src/libs/vue-resource/dist/vue-resource.min.js',
    './src/libs/vue-router/dist/vue-router.min.js',
    './src/libs/moment/moment.js'
  ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./dist/libs'))
);

gulp.task('jade', () => {
  gulp.src('./src/views/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('watch', () => {

  gulp.watch('./src/css/*.css', ['stylus', browserSync.reload]);
  gulp.watch(['./src/views/*.jade', './src/views/partials/*.jade', './src/views/partials/**/*.jade'], ['jade', browserSync.reload]);
  gulp.watch(['./src/js/**/*.js', './src/js/*.js'], ['js', browserSync.reload]);
});

gulp.task('build', ['stylus', 'jade', 'js', 'libs', 'fonts', 'stylus-lib', 'fonts-lib']);

gulp.task('start', ['browser-sync', 'build', 'watch']);

