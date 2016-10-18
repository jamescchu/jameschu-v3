var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    mainBowerFiles = require('main-bower-files'),
    Hexo = require('hexo'),
    hexo = new Hexo(process.cwd(), {});

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

var dest = 'themes/jameschu/source/';

// Generate Hexo Files
gulp.task('hexo-gen', function() {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: true
        });
    }).catch(function(err) {
        console.log(err);
    });
});

// Start BrowserSync with Generation
gulp.task('browser-sync', ['hexo-gen'], function() {
    browserSync({
        open: false,
        notify: false,
        files: "public/**/*",
        server: {
            baseDir: 'public'
        }
    });
});

// Clean Generated Folder
gulp.task('clean', function() {
    return gulp.src('public', {
        read: false
    }).pipe(plugins.clean());
});

// Move Bower Files
gulp.task('bower-css', function() {
    return gulp.src(mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        .pipe(gulp.dest(dest + 'stylesheets/vendor'));
});

// Watch for Updates
gulp.task('watch', function() {
    gulp.watch('bower_components/*', ['bower-css']);
});

gulp.task('default', ['clean', 'browser-sync', 'watch']);
