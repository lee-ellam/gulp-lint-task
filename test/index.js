var should = require('should');
var sinon = require('sinon');
var mock = require('./mocks/gulp');
var jshint = require('gulp-jshint');
var task = require('../lib');

describe('Gulp lint task', function() {
  beforeEach(function() {
    sinon.stub(mock, 'src', function() { return mock });
    sinon.stub(mock, 'pipe', function() { return mock });
  });

  afterEach(function() {
    mock.src.restore();
    mock.pipe.restore();
  });

  it('should throw an error if config or config.src weren\'t passed', function() {
    should.throws(task, 'You must pass an object with a src property glob to the task.');

    should.throws(function() { task({}) }, 'You must pass an object with a src property glob to the task.');
  });

  it('should return a function if config.src was passed', function() {
    var fn = task({ src: '../lib/*.js', jshintrc: './test/fixtures/.jshintrc' });

    (typeof fn).should.equal('function');
  });

  it('should call gulp.src with correct src glob', function() {
    var fn = task({ src: '../lib/*.js', jshintrc: './test/fixtures/.jshintrc' });

    fn.call(mock);

    mock.src.calledWith('../lib/*.js');
  });

  it('should call jshint with config .jshintrc file path or default', function() {
    var fixturePath = './test/fixtures/.jshintrc';
    var fixtureJsHint = jshint(fixturePath);
    var fn1 = task({ src: '../lib/*.js', jshintrc: fixturePath });
    var realJsHint = jshint('./.jshintrc');
    var fn2 = task({ src: '../lib/*.js' });

    fn1.call(mock);

    mock.pipe.calledWith(fixtureJsHint);

    fn2.call(mock);

    mock.pipe.calledWith(realJsHint);
  });

  it('should call jshint.reporter with config reporter or default', function() {
    var fixtureJsHint = jshint.reporter('default');
    var fn1 = task({ src: '../lib/*.js', reporter: 'default' });
    var realJsHint = jshint.reporter(require('jshint-stylish'));
    var fn2 = task({ src: '../lib/*.js' });

    fn1.call(mock);

    mock.pipe.calledWith(fixtureJsHint);

    fn2.call(mock);

    mock.pipe.calledWith(realJsHint);
  });
});
