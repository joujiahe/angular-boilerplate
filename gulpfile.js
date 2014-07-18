var es = require('event-stream');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');;
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulp = require('gulp');


gulp.task('build', ['clean', 'lint', 'assets'], function () {
    var jsFilter = filter('**/*.js');
    var cssFilter = filter('**/*.css');

    return gulp.src('src/index.html')
        .pipe(useref.assets())
        .pipe(jsFilter)
        .pipe(uglify({mangle: false}))
        .pipe(rev())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(cssFilter.restore())
        .pipe(useref.restore())
        .pipe(useref())
        .pipe(revReplace())
        .pipe(gulp.dest('build'));
});

gulp.task('clean', [], function () {
    return gulp.src('build')
        .pipe(clean());
});

gulp.task('assets', ['clean'], function () {
    return es.merge(
        gulp.src('src/images/**/*')
            .pipe(gulp.dest('build/images/')),
        gulp.src('src/views/**/*')
            .pipe(gulp.dest('build/views/')),
        gulp.src('src/vendor/bootstrap/fonts/*')
            .pipe(gulp.dest('build/fonts/')),
        gulp.src('src/vendor/font-awesome/fonts/*')
            .pipe(gulp.dest('build/fonts/'))
    );
});

gulp.task('lint', [], function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('init', [], function () {
    return bower();
});

gulp.task('default', [], function () {
    gulp.start('build');
});