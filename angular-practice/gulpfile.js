var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    utilities = require('gulp-util'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    shell = require('gulp-shell'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    lib = require('bower-files')({
      "overrides": {
        "bootstrap": {
          "main": [
            "less/bootstrap.less",
            "dist/css/bootstrap.css",
            "dist/js/bootstrap.js"
          ]
        }
      }
    });

    gulp.task('tsClean', function(){
  return del(['app/*.js', 'app/*.js.map']);
    });

    gulp.task('ts', ['tsClean'], shell.task([
      'tsc'
    ]));

    gulp.task('jsBowerClean', function(){
      return del(['./build/js/vendor.min.js']);
    });

    gulp.task('jsBower', ['jsBowerClean'], function(){
      return gulp.src(lib.ext('js').files)
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build/js'));
    });

    gulp.task('cssBowerClean', function(){
      return del(['./build/css/vendor.css']);
    });

    gulp.task('cssBower', ['cssBowerClean'], function(){
      return gulp.src(lib.ext('css').files)
      .pipe(concat('vendor.css'))
      .pipe(gulp.dest('./build/css'));
    })

    gulp.task('bower', ['jsBower', 'cssBower']);

    gulp.task('sassBuild', function(){
      return gulp.src(['resource/styles/*'])
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/css'));
    });

    gulp.task('serve', function(){
      browserSync.init({
        server: {
          baseDir: "./",
          index: "index.html"
        }
      });
      gulp.watch(['resources/js/*.js'], ['jsBuild']);
      gulp.watch(['.html'], ['htmlBuild']);
      gulp.watch(['resources/styles/*.css', 'resurces/styles/*.scss'], ['cssBuild']);
      gulp.watch(['app/ts'], ['tsBuild']);
    });

    gulp.task('jsBuild', function(){
      browserSync.reload();
    });

    gulp.task('htmlBuild', function(){
        browserSync.reload();
    });

    gulp.task('cssBuild', function(){
      browserSync.reload();
    });

    gulp.task('tsBuild', ['ts'], function(){
  browserSync.reload();
});

    gulp.task('build', ['ts'], function(){
      gulp.start('bower');
      gulp.start('sassBuild');
});
