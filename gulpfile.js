var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src(['**/*.js'])
        .pipe(gulp.dest('/home/wit/projects/UBHD-Lens/node_modules/lens'));
});

gulp.task('watch', function() {
    gulp.watch('**/*.*',['default']);

});
