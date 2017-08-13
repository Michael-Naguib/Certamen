"use strict";

//Setup
const gulp = require('gulp');
const jade = require("gulp-jade");
const htmlmin = require("gulp-htmlmin");
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');
const htmlhint = require("gulp-htmlhint");

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
        jadein:"./dev/markup/*.{pug,jade}",
        htmlin:"./dev/markup/*.html",
        htmlout:"./www/markup/",
        suffix:".min",
        extname:".html"
    }

    // Get the data that will be compiled into the jade files... consider a db in the future
    //const hashes = JSON.parse(fs.readFileSync("path", 'utf8')); {locals:hashes}

    //manage compiling jade locals minifying and returning
    var jadefiles = gulp.src(markupsettings.jadein)
                   .pipe(jade());

    //manage html minifying and returning
    var html = gulp.src(markupsettings.htmlin);
    //Merge and return
    var mergedHtml =merge2(jadefiles,html);

    //Return
    return mergedHtml.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({
        suffix: markupsettings.suffix,
        extname: markupsettings.extname
    }))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(markupsettings.htmlout));

});
