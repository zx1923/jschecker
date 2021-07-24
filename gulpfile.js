const gulp = require('gulp');
const uglyjs = require('gulp-uglify');
const clean = require('gulp-clean');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

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

gulp.task('publish', async () => {
  await spawnSync('npm', ['run', 'lib'], { shell: true });
  process.chdir(path.join(__dirname, 'dist'));
  await spawnSync('npm', ['pack'], { shell: true });
  await spawnSync('npm', ['publish'], { shell: true });
});

gulp.task('dev', gulp.series('dev:build'));

gulp.task('default', gulp.series('build:ts', 'build:config'));
