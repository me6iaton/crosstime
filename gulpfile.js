const gulp = require('gulp');
const forever = require('forever-monitor');

const spawn = require('child_process').spawn;
const os = require('os');
const path = require('path');

function getShellCmd(cliName, args) {
  const osCMD = os.platform() === 'win32' ? '.cmd' : '';
  let cmd = path.resolve('./node_modules/.bin/' + cliName + osCMD);
  return spawn(cmd, args);
}
function gulpShellCmd(done, cliName, args, cb, steamRoll) {
  if (!cb) cb = data => console.log(String(data));
  let cmd = getShellCmd(cliName, args);
  cmd.stderr.pipe(process.stderr);
  cmd.stdout.on('data', data => cb(done, data));
  ['close', 'exit', 'error'].forEach(listName => {
    if (steamRoll) {
      return cmd.on(listName, () => done());
    }
    cmd.on(listName, done);
  });
}
const gsc = gulpShellCmd;

//#region gulp-typescript
// see https://github.com/ivogabe/gulp-typescript/issues/549
// const ts = require('gulp-typescript');
// const tsProject = ts.createProject('tsconfig.json');
// const globs = {
//   ts: ['src/**/*.ts', 'test**/*.ts', 'index.ts'],
// };
// gulp.task('build:ts', () => {
//   return gulp.src(globs.ts, { base: './' })
//     .pipe(tsProject())
//     .pipe(gulp.dest('built'));
// });
//#endregion

const server = new forever.Monitor('index.js', {silent: false});

gulp.task('watch:ts-cli', done => {
  let count = 0;
  return gsc(done, 'lb-tsc', ['es2017', '--watch'], (done, data) => {
    content = String(data);
    console.log(`ts: ${content}`);
    if (content.includes('Compilation complete. Watching for file changes.')) {
      if (count == 0) {
        done();
      }
      count++;
      if (server.childExists && count > 1) {
        console.log(`server: reload \n`);
        server.restart();
      }
    }
  });
});

gulp.task('serve', done => server.start());

gulp.task('serve:dev', gulp.series('watch:ts-cli', 'serve'));
