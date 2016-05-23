'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifycss from 'gulp-minify-css';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import clean from 'gulp-clean';

const scssSrcPath = [
  './scss/u.scss',
  './scss/u-extend.scss'
]

gulp.task('sass', () => {
  return gulp.src(scssSrcPath)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task("es2015", function () {
  return gulp.src("js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("u.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
});

gulp.task('serve', function() {
    // static server
    browserSync({
        files: ['scss/**/*.scss', 'src/**.js', 'dist', 'plugins'],
        server: {
            baseDir: "./"
        }
    });

    // watch task
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./js/src/*.js', ['es2015']);

});

// 清空 hrcloud 目录下的资源
gulp.task('clean',function() {
  gulp.src('dist/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('default', ['sass', 'es2015', 'serve'])