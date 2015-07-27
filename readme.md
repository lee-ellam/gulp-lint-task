# Gulp Lint Task

Configurable linting task for gulp. Uses jshint.

## Install
```
npm install lee-ellam/gulp-lint-task
```

## Usage
```
var gulp = require('gulp');
var lint = require('gulp-lint-task');

gulp.task('linter', lint({ src: '**/*.js' }));

gulp.task('default', ['linter']);
```

## Options
Task options:
- `src`
 - *Required*. Takes a glob string or an array of glob strings.
- `jshintrc`
 - *Optional*. String location of .jshintrc options file.
