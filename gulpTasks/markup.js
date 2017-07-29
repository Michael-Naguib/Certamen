"use strict";

//Setup
const gulp = require('gulp');
const jade = require("gulp-jade");
const htmlmin = require("gulp-htmlmin");
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');

/*
    # Design Goals
    + Build html multiple templates
    + Compile templates
    + add in SRI Hashes
    + minify
    + Validate HTML
    + Log Errors & restart 

*/
gulp.task("markup",function(){
    //markup task settings
    const markupsettings = {
        jadein:"",
        jadelocals:"YOUR path to FILE.JSON FOR LOCALS!!!!",
        htmlin:"",
        htmlout:"",
        dirname:"./",
        suffix:".min",
        extname:".html"
    }

    // Get the data that will be compiled into the jade files... consider a db in the future
    const jadelocals = JSON.parse(fs.readFileSync(markupsettings.jadelocals, 'utf8'));

    //manage compiling jade locals minifying and returning
    var jade = gulp.src(markupsettings.jadein)
                   .pipe(jade({locals:jadelocals}))
                   .pipe(htmlmin({collapseWhitespace: true}))
                   .pipe(gulp.dest(markupsettings.htmlout));

    //manage html minifying and returning
    var html = gulp.src(markupsettings.htmlin)
                   .pipe(htmlmin({collapseWhitespace: true}))
                   .pipe(gulp.dest(markupsettings.htmlout));

    //Merge and return
    return merge2(jade,html);
});
