"use strict";

//Setup
const gulp = require("gulp");

//Webpack
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

//Optimization and Helper
const jsmin = require("gulp-jsmin");
const sourcemaps = require('gulp-sourcemaps');
const merge2 = require('merge2');
const rename = require("gulp-rename");
const named = require('vinyl-named');
const through = require('through2');
const fs = require('fs');
const glob = require("glob");
const path = require("path");

//Config
const scriptsconfig={
    src:path.resolve(__dirname,"../")+"/dev/scripts/*.{jsx,js}",
    dest:path.resolve(__dirname,"../")+"/www/scripts/",
    extname:".js",
    suffix:".min"
}

//Setup the webpack config: PROCESSES THE FILEPATHS
var webpackConfig = require("../webpack.config.js");
var unmodifiedFilepathsForWebpack = glob.sync(scriptsconfig.src);
var modifiedFilepathsForWebpack = {};
unmodifiedFilepathsForWebpack.forEach(function(item){
    var filenameOfItem = path.basename(item);// get the basename e.x ./certamen/readme.md ---> readme.md
    var nameOfFile = filenameOfItem.replace(/\.[^/.]+$/, "");//removes any extensions readme.md  --> readme
    modifiedFilepathsForWebpack[nameOfFile] = item;// saves each filepath as its name in the stream
});
webpackConfig.entry = modifiedFilepathsForWebpack; //Set the entry to the files

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
    return webpackStream(webpackConfig,webpack)
    .on("error",(error)=>{
        //console.log(`[SCRIPTS ERROR] ${error}`)
    })
    .pipe(jsmin())
    .pipe(rename({
        suffix:scriptsconfig.suffix,
        extname:scriptsconfig.extname
    }))
    .pipe(gulp.dest(scriptsconfig.dest));
});

gulp.task("scriptsold",function(){

    throw "this is the old version of the scripts function it is nonfunctional but necessary to keep it for a simplified build";
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
    var jsx = gulp.src(scriptssettings.jsxin).pipe(react().on("error",function(err){console.log("[React Encountered an Error: Check Syntax!]")}));
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
