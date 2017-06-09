"use strict";

//Requires .pipe(webmake())
const gulp = require("gulp");
var source = require('vinyl-source-stream');
var reactify = require("reactify");
const babelify = require("babelify");
// also npm babel-preset-es2015 & babel-preset-react
var browserify = require('browserify');

gulp.task("default",function(){
    // ~~~ MAGIC do  not touch 
    const b = browserify();
    b.add("./dev/src/javascript/QuestionForm.jsx");
    b.transform(babelify.configure({presets: ["es2015", "react"]}));
    return b.bundle().pipe(source('QuestionForm.js')).pipe(gulp.dest('./dev/src/javascript/')); 
});