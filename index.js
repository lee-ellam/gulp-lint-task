var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp, config) {
  return gulp.task('lint', function() {
    console.log('linting')
    return gulp.src(config.src)
       .pipe(jshint(config.jshintrc))
       .pipe(jshint.reporter(stylish));
  });
};
