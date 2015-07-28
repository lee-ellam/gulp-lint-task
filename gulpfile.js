var gulp = require('gulp');
var lint = require('./lib');
var mocha = require('gulp-mocha');
var git = require('gulp-git');
var bump = require('gulp-bump');
var sequence = require('run-sequence');

// Lint task - Meta AF
gulp.task('lint', lint({ src: './lib/*.js' }));

// Tests
gulp.task('test', ['lint'], function() {
  return gulp.src('./test/index.js', { read: false })
    .pipe(mocha({ reporter: 'dot' }));
});

// Bump patch version
gulp.task('bump', ['test'], function() {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'patch' }))
    .pipe(gulp.dest('./'));
});

// Bump minor version
gulp.task('bump:minor', ['test'], function() {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

// Bump major version
gulp.task('bump:major', ['test'], function() {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});

// Commit change
gulp.task('commit', function() {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('.')
    .pipe(git.commit('Bumped version number'));
});

// Push changes
gulp.task('push', function(cb) {
  git.push('origin', 'master', cb);
});

// Commit and tag release in git
gulp.task('tag', function(cb) {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Tag for release ' + v;

  git.tag(v, message, function(err) {
    if (err) {
      return cb(err);
    } else {
      git.push('origin', 'master', { args: '--tags' }, cb);
    }
  });
});

// Release to git
gulp.task('release', function(cb) {
  sequence('bump', 'commit', 'push', 'tag', fn);
});
gulp.task('release:minor', function(cb) {
  sequence('bump:minor', 'commit', 'push', 'tag', fn);
});
gulp.task('release:major', function(cb) {
  sequence('bump:major', 'commit', 'push', 'tag', fn);
});

function fn(err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Released successfully');
  }
  cb(err);
}
