"use strict";

//Setup
const gulp = require("gulp");
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const jsmin = require("gulp-jsmin");
const sourcemaps = require('gulp-sourcemaps');
const merge2 = require('merge2');
const rename = require("gulp-rename");
const named = require('vinyl-named');
const through = require('through2');
const fs = require('fs');

//Config
const scriptsconfig={
    src:"../dev/scripts*.{.jsx,js}",
    dest:"../www/scripts/",
    extname:".js",
    suffix:".min"
}
var webpackConfig = require("../webpack.config.js");

/*
    # Task Definition:
    0. sourcemaps
    1. webpack everything into bundle
    2. lint
    3. minify
    4. uglify
    5. dest

*/


//Task Definition
gulp.task("scripts",function(){
    return gulp.src(scriptsconfig.src)
    .pipe(named())
    .pipe(webpackStream(webpackConfig,webpack))
    .pipe(rename({
        suffix:scriptsconfig.suffix,
        extname:scriptsconfig.extname
    })).pipe(gulp.dest(scriptsconfig.dest));
});
