const gulp = require("gulp");

// packages
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const eslint = require("gulp-eslint");
const webpack = require("webpack");
const webpackconfig = require("../../webpack.config");
const webpackstream = require("webpack-stream");

// Lint scripts
function lint() {
    return gulp
        .src([
            "./src/assets/js/components/**/*",
            "./src/assets/js/app.js",
            "./gulpfile.js"
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}


//Concat and Compress Vendor .js files
function vendors() {
    return gulp.src([
            "src/assets/js/vendors/jquery.min.js",
            "src/assets/js/vendors/*.js"
        ])
        .pipe(plumber())
        .pipe(concat("vendors.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
};

// Transpile, concatenate and minify scripts
function build() {
    return (
        gulp
        .src([
            "./src/assets/js/components/**/*",
            "./src/assets/js/*"
        ])
        .pipe(webpackstream(webpackconfig, webpack))
        // folder only, filename is specified in webpack
        .pipe(gulp.dest("./dist/js/"))
    );
}

// exports (Common JS)
module.exports = {
    lint: lint,
    vendors: vendors,
    build: build
};