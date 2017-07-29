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
const config={
    src:"",
    dest:""
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
    return gulp.src(config.src)
    .pipe(named())
    .pipe(webpackStream(webpackConfig,webpack))
});

//OLD CODE--> reimplement in above workflow
gulp.task("scripts",function(){
    //scripts task settings
    const scriptssettings = {
        jsxin:"",
        jsin:"",
        jsout:"",
        concatname:"concat.js",
        dirname:"./",
        basename:"index",
        suffix:".min",
        extname:".js"
    }

    //set up the two sources and convert
    var jsx = gulp.src(scriptssettings.jsxin).pipe(react().on("error",function(){console.log("[React Encountered an Error: Check Syntax!]")}));
    var js = gulp.src(scriptssettings.jsin);

    //Merge the sources
    var alljs = merge2(js,jsx);

    /* Process the files
        -put all the files as 1 js file
        -minify
        -rename
        -specify destination
    */
    return alljs.pipe(concat(scriptssettings.concatname))
                .pipe(jsmin())
                .pipe(rename({
                    dirname:scriptssettings.dirname,
                    basename:scriptssettings.basename,
                    suffix:scriptssettings.suffix,
                    extname:scriptssettings.extname
                 }))
                .pipe(gulp.dest(scriptssettings.jsout));
});
