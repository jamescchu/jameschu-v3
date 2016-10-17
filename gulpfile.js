var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    Hexo = require('hexo'),
    hexo = new Hexo(process.cwd(), {});

gulp.task('hexo-gen', function() {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: true
        });
    }).catch(function(err) {
        console.log(err);
    });
});

gulp.task('browser-sync', ['hexo-gen'], function() {
    browserSync({
        open: false,
        notify: false,
        files: "public/*",
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('hexo-reload', ['hexo-gen'], function() {
    browserSync.reload();
});

gulp.task('watch', function() {
    gulp.watch('public/*', ['hexo-reload']);
});

gulp.task('clean', function() {
    return gulp.src('public', {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['clean', 'browser-sync', 'hexo-gen']);
