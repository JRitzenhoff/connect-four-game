var gulp = require('gulp');
var concat = require('gulp-concat');

 
gulp.task("concat", function(){
  return gulp.src(['src/js/gameView.js','src/js/gameController.js'])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist'));
})