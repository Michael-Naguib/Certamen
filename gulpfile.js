"use strict";
//Requires & Setup

//Base Gulp
const gulp = require('gulp');

//HTML
//const jade = require("gulp-jade");
const htmlmin = require("gulp-htmlmin");

//Images
//const image = require("gulp-image");

//Js
const jsmin = require("gulp-jsmin");
const concat = require('gulp-concat');
const babel = require('gulp-babel');

//Extra
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');

//CSS 
const cleancss = require('gulp-clean-css'); // dont forget to install this
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css'); // dont forget to install this


var fatalLevel = require('yargs').argv.fatal;// not yet added to dependancies!!!!!
var gutil = require('gulp-util');// not yet added to dependancies!!!!!
//use pipe().on('error',function(err){}).pipe()

var gulpPath = require('gulp-path');//install...
/*

## Design Goals
### Gulpfile
+ .scss-transpile-.css-autoprefix-minify-concatanate-rename-pipe2dest
+ .pug/.jade-transpile-minify-rename-pipe2dests
+ .jsx-transpile-babel-js-minify-concatSOME-rename-pipe2dests
+ assets-optimize-pipe2dests

### Special tasks
+ handle material UI integration in babel with jsx and code....
+ Catch errors in transpilation, console log and actually make a legit file log and add to .gitignore 

*/

gulp.task("babelTest",function(){
    
    // Task definition~~~ quick n messy for now...
    return gulp.src("./dev/src/javascript/QuestionForm.jsx").pipe(babel({presets: ["es2015", "react"]})).pipe(gulp.dest("./dev/src/javascript/"));
});
