const gulp = require('gulp');
const uglyjs = require('gulp-uglify');
const clean = require('gulp-clean');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const fs = require('fs');

gulp.task('clean:node', async () => {
  const { src } = gulp;
  if (fs.existsSync('dist/build')) {
    await src('dist/build').pipe(clean());
  }
});

gulp.task('build:ts', async () => {
  const { dest } = gulp;
  await tsProject.src()
    .pipe(tsProject())
    .js.pipe(uglyjs())
    .pipe(dest("dist/build"));
});

gulp.task('build:config', async () => {
  const { src, dest } = gulp;
  await src('package.json').pipe(dest('dist/build'));
});

gulp.task('dev:build', async () => {
  const { dest } = gulp;
  await tsProject.src()
    .pipe(tsProject())
    .pipe(dest("dist/build"));
});

gulp.task('dev', gulp.series('dev:build'));

gulp.task('default', gulp.series('build:ts', 'build:config'));
