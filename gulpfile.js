"use strict";

//Setup
const gulp = require('gulp');
const image = require("gulp-image");
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');
var fatalLevel = require('yargs').argv.fatal;
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var gulpPath = require('gulp-path');

//Add in the modularized dependancies:
const requiredir = require("requiredir");
var requires = requiredir("./gulpTasks");

/*
    # Design Goals
    + jade/pug main and minify html
    + compile and minify and concat js with webpack & bundle
    + compile and merge and concat and prefix and minify/clean css
    + generate hashes of resources and use as SRI hash in any html/markup

*/


gulp.task('default',()=>{
    return gulp.watch('./dev/**/*.*',['scripts','stylesheets','markup','assets','php'])
});
