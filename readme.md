# Gulp Lint Task

Configurable linting task for gulp. Uses jshint.

## Install
```
npm install lee-ellam/gulp-lint-task
```

## Usage
```
var gulp = require('gulp');
var task = require('gulp-lint-task');

task(gulp, {
  taskName: 'linter'
  src: '**/*.js'  
});

gulp.task('default', ['linter']);
```

## Options
Task options:
- `src`
 - *Required*. Takes a glob string or an array of glob strings.
- `taskName`
 - *Optional*. String to reference the task, defaults to `lint`.
- `jshintrc`
 - *Optional*. String location of .jshintrc options file.
