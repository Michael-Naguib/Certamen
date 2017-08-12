"use strict";

//Setup
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');

/*
    # Design Goals
    + transpile sass
    + clean,lint,minify & prefix css
    + concatanate css
*/
gulp.task("stylesheets",function(){
    //Stylesheets task settings
    const stylesheetsettings = {
        sassin:"../dev/stylesheets/*.scss",
        cssin:"../dev/stylesheets/*.css",
        cssout:"../www/stylesheets/",
        concatname:"concat.css",
        suffix:".min",
        extname:".css"

    }

    //Set up the two sources and convert
    var sass = gulp.src(stylesheetsettings.sassin).pipe(sass.sync().on('error', sass.logError));
    var css =  gulp.src(stylesheetsettings.cssin);

    //Merge the sources
    var allcss = merge2(sass,css);

    /* Process the files
        -put all the files as 1 css file
        -add in browser fixes for all browsers
        -minify::'clean'
        -rename
        -specify destination
    */
    return allcss.pipe(concatcss(stylesheetsettings.concatname))
                 .pipe(autoprefixer({browsers:["last 2 versions"],cascade:false}))
                 .pipe(cleancss())
                 .pipe(rename({
                    suffix:stylesheetsettings.suffix,
                    extname:stylesheetsettings.extname
                 }))
                 .pipe(gulp.dest(stylesheetsettings.cssout));

});
