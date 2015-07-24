var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp, config) {
  if (!config.src) throw new Error('You must pass a src glob to the the task!');

  return gulp.task(config.taskName || 'lint', function() {
    return gulp.src(config.src)
       .pipe(jshint(config.jshintrc || '/.jshintrc'))
       .pipe(jshint.reporter(stylish));
  });
};
