var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('src/vip/sass/*.scss')
    .pipe(watch('src/vip/sass/*.scss')) //监听改变过的文件
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})) //nested expanded compact compressed
    .pipe(autoprefixer({
        browsers: ['Android >= 4.0','last 3 Safari versions','iOS 7','ie >= 9'],
        cascade: true, //是否美化属性值 默认：true
        remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/vip/css'));
});


gulp.task('serve', function() {
    browserSync.init({
        server: "./src",
        files: ["src/vip/css/*.css"]
    });
    gulp.watch("src/vip/sass/*.scss",['sass']);
    gulp.watch("src/vip/*.html").on('change', reload);
    gulp.watch("src/vip/js/*.js").on('change', reload);
});

gulp.task('default', ['serve']);
