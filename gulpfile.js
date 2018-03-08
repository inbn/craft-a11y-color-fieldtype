const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
  src: {
    js: [
      'src/assetbundles/a11ycolorfield/src/js/A11ycolor.js'
    ]
  },
  dest: {
    js: 'src/assetbundles/a11ycolorfield/dist/js/'
  }
};

gulp.task('js', function () {
  paths.src.js.map(path => {
    return browserify({entries: path, debug: true})
      .transform('babelify')
      .bundle()
      .pipe(source(path.split('/').pop()))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dest.js));
  });
});

gulp.task('default', ['js'], function () {
  gulp.watch(paths.src.js, ['js']);
});
