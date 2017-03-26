var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    pug = require('gulp-pug');

var opt = {

    path:{

        src: {
            html: './src/**/*.jade',
            js: './src/js/*.js',
            style: './src/style/*.less'
        },

        watch: {
            html: './src/**/*.jade',
            js: './src/js/*.js',
            style: './src/style/*.less'
        },

        build: {
            html: './build/',
            js: './src/js/',
            style: './src/style/'
        }
    }

};

gulp.task('pug', function() {
    return gulp.src(opt.path.src.html)
        .pipe(pug({
            // Your options in here.
        }))
});

gulp.task('less', function() {
    gulp.src(opt.path.src.style)
        .pipe(less())
        .pipe(gulp.dest(opt.path.build.style));
});