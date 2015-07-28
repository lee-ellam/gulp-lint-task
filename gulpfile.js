var gulp = require('gulp');
var lint = require('./lib');
var mocha = require('gulp-mocha');
var git = require('gulp-git');
var bump = require('gulp-bump');

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
    .pipe(git.commit(message));
});

// Commit and tag release in git
gulp.task('tag', function() {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Tag for release ' + v;

  git.tag(v, message, function(err) {
    if (err) console.error(err);
    git.push('origin', 'master', { args: '--tags' }, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Release successful');
      }
    });
  });
});

// Release to git
gulp.task('release', ['bump', 'tag']);
gulp.task('release:minor', ['bump:minor', 'tag']);
gulp.task('release:major', ['bump:major', 'tag']);
