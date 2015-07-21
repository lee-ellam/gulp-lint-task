var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp) {
  gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
       .pipe(jshint('.jshintrc'))
       .pipe(jshint.reporter(stylish));
  });
};
