var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    pug = require('gulp-pug');

var path ={

    src: {
        html: './src/*.pug',
        js: './src/js/*.js',
        style: './src/style/*.less'
    },

    watch: {
        html: './src/**/*.pug',
        js: './src/js/*.js',
        style: './src/style/**/*.less'
    },

    build: {
        html: './build/',
        js: './build/js/',
        style: './build/style/'
    }

};

gulp.task('pug', function() {
    return gulp.src(path.src.html)
        .pipe(pug())
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('less', function() {
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(gulp.dest(path.build.style));
});

gulp.task('watcher',function(){
    gulp.watch(path.watch.html, ['pug']);
    gulp.watch(path.watch.style, ['less']);
});

gulp.task('default', ['watcher']);