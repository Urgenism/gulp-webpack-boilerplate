// packages
const gulp = require("gulp");
const newer = require("gulp-newer");

// Copy fonts
function copyFonts() {
  return gulp
    .src("./src/assets/fonts/**/*")
    .pipe(newer("./dist/fonts/"))
    .pipe(gulp.dest("./dist/fonts/"));
}

// Copy html
function copyHtml() {
    return gulp
      .src("./src/**/*.html")
      .pipe(newer("./dist/"))
      .pipe(gulp.dest("./dist/"));
  }

// exports
module.exports = {
  copyFonts: copyFonts,
  copyHtml: copyHtml
};
