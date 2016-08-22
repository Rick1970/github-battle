var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    utilities = require('gulp-util'),
    del = require('del'),
    browser-sync = require('browser-sync').create(),
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

    gulp.task('ts', ['tsClean'], shell.task(['tsc']));

    gulp.task('jsBower', ['jsBowerClean'], function(){
      return del(['./build/js/vendor.min.js']);
    });

    
