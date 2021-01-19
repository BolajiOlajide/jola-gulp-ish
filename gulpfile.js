const gulp = require('gulp');
const fs = require('fs');
const replace = require('gulp-replace');

const { runThings } = require('./utils');

gulp.task('something', function(done) {
  const settings = fs
    .readFileSync('.env', 'utf-8')
    .split('\n');

  const formattedSetting = {};

  settings.forEach((setting) => {
    if (setting) {
      const [key, value] = setting.split('=');
      formattedSetting[key] = value;
    }
  });

  gulp.src('./something.js')
    .pipe(replace(/process.env.[a-zA-Z_]+/gm, function(match) {
      const [_, key] = match.split('process.env.');
      return `'${formattedSetting[key]}'`;
    }))
    .pipe(replace(/http:\/\/localhost:\d+/g, function(match) {
      return 'http://example.com';
    }))
    .on('error', function (error) {
      console.error(error);
    })
    .pipe(gulp.dest('output'));

  done();
});