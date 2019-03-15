// packages
const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");

// CSS task
function buildCss() {
    return gulp
        .src("src/assets/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded"
        }).on("error", sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream({
            match: "**/*.css"
        }));
}

function minifyCSS() {
    return gulp.src("src/assets/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass({
            outputStyle: "expanded"
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(cleanCSS({
            compatibility: "ie8"
        }))
        .pipe(gulp.dest("dist/css"));
}

// exports
module.exports = {
    buildCss: buildCss,
    minifyCSS: minifyCSS
};