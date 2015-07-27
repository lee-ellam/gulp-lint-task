'use strict';

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(config) {
  if (!config || !config.src) throw new Error('You must pass an object with a src property glob to the task.');

  return function() {
    return this.src(config.src)
       .pipe(jshint(config.jshintrc || './.jshintrc'))
       .pipe(jshint.reporter(config.reporter || stylish))
       .pipe(jshint.reporter('fail'));
  };
};
