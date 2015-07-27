var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(config) {
  if (!config.src) throw new Error('You must pass a src glob to the the task!');

  return function() {
    return this.src(config.src)
       .pipe(jshint(config.jshintrc || './.jshintrc'))
       .pipe(jshint.reporter(stylish));
  };
};
