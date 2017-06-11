"use strict";
//=================================================================  SETUP =====================================================================
//Requires
const gulp = require("gulp");

//Js/Jsx/ES6 requires
const webpack = require("gulp-webpack");
const named = require('vinyl-named')

//Html and markup
const htmlmin = require("gulp-htmlmin");
//const htmlv = require('gulp-html-validator');

//Css and Scss (Stylings)
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

// Extra requires
const merge2 = require('merge2');
const rename = require("gulp-rename");
const path = require('path');// node native


//================================== Top Level Gulp Default Task ===============================================================

gulp.task("default",["js","css","html","copyover","js"]);
gulp.task("sinjs",["js","css","html","copyover"]);

//========================================  JAVASCRIPT =========================================================================

//compile js written in es6 with react code 
gulp.task("js",()=>{
    
    //select files? this may give an error?
    return gulp.src("./dev/src/javascript/*.{js,jsx}")
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./webRoot/src/javascript/"));
});

//=========================================  MARKUP  ==========================================================================

//minify a html file; pass a GULP-STREAM
function minifyHTML(myFileStream,addExtensionMin){
    // Minify the file[s]
    var base = myFileStream.pipe(htmlmin({collapseWhitespace: true,caseSensitive:true,removeComments:true}));
    
    // Add the .min suffix defaults to TRUE
    if(!addExtensionMin){
        base = base.pipe(rename({suffix:".min"}));
    }
    return base;
}

//Minify and move html files... , see the hConfig object inside the task function    NOTE: consider abstractifying html,buildJsDeps task
gulp.task("html",function(){
    
    /* 
        The file path at index X in filePaths will be sent to the output path at index X in fileOutDirs
    
        if a list of filepaths or a file-path-regex*like path is present in filePaths, that group will be sent to the corresponding index X output path
            
        Be sure to exclude the other files in the group if you dont want duplicates of the other files in the directory
    */
    
    //Config
    const hConfig={
        filePaths: ["./dev/index.html","./dev/src/markup/extra.html"],
        fileOutDirs:["./webRoot/","./webRoot/src/markup/"],
        minify: true
    };
    
    //quick err check...
    if(hConfig.filePaths.length !== hConfig.fileOutDirs.length){
        throw new Exception("[FATAL]: gulp task html: there is not a fileOutDirs path for every filePaths path");
    }
    
    // Store the streams before merging
    var finished = [];
    
    // Main Logic: iterate and convert
    for(var i=0;i<hConfig.filePaths.length;i++){
        //File Path
        var current = gulp.src(hConfig.filePaths[i]);
        
        // Minify?
        if(hConfig.minify){
            current = minifyHTML(current);
        }
        //Validate html
        //current = current.pipe(htmlv({format: 'html'}));
        
        //Set their destinations
        current.pipe(gulp.dest(hConfig.fileOutDirs[i]));
        
        //put all the files in one place so they can be merged and returned
        finished.push(current);
    }
    
    //return the finished task.....
    if(hConfig.filePaths.length === 1){
        //Since there is only one file return that one... no need for merge
        return finished[0];
    }else{
        // Merge the multiple Files to return
        return merge2(finished);
    }
});

//=========================================  STYLINGS  ========================================================================

// convert sass, autoprefix css, and minify
gulp.task("css",function(){
    // A bit of code borrowed & modified from my project: https://github.com/Michael-N/Personal-Site.git
    
    //Process sass files
    var sassFiles = gulp.src(["./dev/src/stylesheets/*.scss","./dev/src/stylesheets/*.sass"])
                    .pipe(sass.sync().on('error', sass.logError))
                    .pipe(autoprefixer({browsers:["last 2 versions"],cascade:false}))
                    .pipe(cleanCss())
                    .pipe(rename({suffix:".min",extname:".css"}))
                    .pipe(gulp.dest("./webRoot/src/stylesheets/"));
    
    //Process normal css files
    var cssFiles =  gulp.src("./dev/src/stylesheets/*.css")
                    .pipe(autoprefixer({browsers:["last 2 versions"],cascade:false}))
                    .pipe(cleanCss())
                    .pipe(rename({suffix:".min",extname:".css"}))
                    .pipe(gulp.dest("./webRoot/src/stylesheets/"));
    
    //Merge to return
    return merge2(sassFiles,cssFiles);
    
});

//========================================= ASSETS ============================================================================

// A bit of code borrowed & modified from my project: https://github.com/Michael-N/Personal-Site.git
//Move any other files in ./dev to ./src for production.... no preprocessing done...
gulp.task("copyover",function(){
    //copy the files...
    return gulp.src("./dev/src/assets/**/*.*").pipe(gulp.src("./webRoot/src/assets/"));
    
});