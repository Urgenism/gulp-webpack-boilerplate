//oad plugins
const gulp = require("gulp");

// import tasks
const copy = require("./gulp/tasks/copy");
const clean = require("./gulp/tasks/clean");
const css = require("./gulp/tasks/styles");
const server = require("./gulp/tasks/browserSync");
const images = require("./gulp/tasks/images");
const js = require("./gulp/tasks/scripts");

// Watch files
function watchFiles() {
    gulp.watch("./src/assets/scss/**/*", css.buildCss);
    gulp.watch("./src/assets/js/**/*", scripts);
    gulp.watch("./src/assets/img/**/*", images.optimizeImages);
    gulp.watch("./src/*.html", copy.copyHtml);
    gulp.watch("./src/assets/fonts/**/*", copy.copyFonts);
}

// define complex tasks
const scripts = gulp.series(js.lint, js.vendors, js.build);
const watch = gulp.parallel(watchFiles, server.init, server.reload);
const build = gulp.series(
    clean.all,
    gulp.parallel(copy.copyHtml, copy.copyFonts, css.minifyCSS, images.optimizeImages, scripts)
);

// expose tasks to CLI
exports.build = build;
exports.watch = watch;
exports.default = build;