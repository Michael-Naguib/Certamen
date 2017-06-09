"use strict";
//=================================================================  SETUP =====================================================================
//Requires
const gulp = require("gulp");

//Js/Jsx/ES6 requires
const source = require('vinyl-source-stream');
const buffer = require("vinyl-buffer"); //hotfix for minifing a browserified stream...
const reactify = require("reactify");
const babelify = require("babelify");
const concat = require('gulp-concat');
const jsmin = require("gulp-jsmin");
const browserify = require('browserify');
const react = require('gulp-react'); // deprecated but it works well... may need to replace in future... and it is 10x faster than browserify...

//Html and markup
const htmlmin = require("gulp-htmlmin");

//Css and Scss (Stylings)
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

// Extra requires
const merge2 = require('merge2');
const rename = require("gulp-rename");
const path = require('path');// node native

/*
    Note to Self: browserifyFile function auto returns a buffered vinyl stream!!! ( i feel like this may cause errors in the future...)
*/


//================================== Top Level Gulp Default Task ===============================================================

gulp.task("default",["js","css","html","copyover","buildJsDeps"]);
gulp.task("nobuild",["js","css","html","copyover"]);

//========================================  JAVASCRIPT =========================================================================

// Convert ES6 with JSX syntax to JS and bundle their dependancies from import; pass a FILEPATH!
function browserifyFile(myFilePath,fileNewName){
    // ~~~ Duplicate MAGIC do  not touch  
    const b = browserify();
    
    // Each file processed seperatly
    b.add(myFilePath);
    
    //Run through ES6 then React-JSX transpiler
    b.transform(babelify.configure({presets: ["es2015", "react"],plugins:["material-ui"]}));
    
    //Bundle the dependancies from import syntax and give the stream a name
    return b.bundle().pipe(source(fileNewName)).pipe(buffer()); 
    
    //NOTE: the return value must still be piped to gulp.dest() 
}

//minify a js file; pass a GULP-STREAM
function minifyJs(myFileStream,addExtensionMin){
    // Minify the file[s]
    var base = myFileStream.pipe(jsmin());
    
    // Add the .min suffix defaults to TRUE
    if(!addExtensionMin){
        base = base.pipe(rename({suffix:".min"}));
    }
    return base;
}

// Browserify/Es6/JSX minify them (separatly) then send to a destination: see the bdConfig object inside the task function
gulp.task("buildJsDeps",function(){
    //Help the user...
    console.log("[Gulp Task buildJsDeps] Expect this task to take a long time...");
    
    // This task will transpile/bundle jsDeps... example: the ./dev/src/javascript/vendors.js or any other files specified in the below config
    // the file path at index X in filePaths will be sent to the output path at index X in fileOutDirs
    const bdConfig={
        filePaths:["./dev/src/javascript/vendors.js"],
        fileOutDirs:["./webRoot/src/javascript/"],
        minify: true
    };
    
    //quick err check...
    if(bdConfig.filePaths.length !== bdConfig.fileOutDirs.length){
        throw new Exception("[FATAL]: gulp task buildDepsJs: there is not a fileOutDirs path for every filePaths path");
    }
    
    // Store the streams before merging
    var finished = [];
    
    // Main Logic: iterate and convert
    for(var i=0;i<bdConfig.filePaths.length;i++){
        //File Path
        var currentFilePath = bdConfig.filePaths[i]
        
        //Transpile
        var transpiledFile = browserifyFile(currentFilePath,path.posix.basename(currentFilePath));
        
        // Minify?
        if(bdConfig.minify){
            transpiledFile = minifyJs(transpiledFile);
        }
        
        //Set their destinations
        transpiledFile.pipe(gulp.dest(bdConfig.fileOutDirs[i]));
        
        //put all the files in one place so they can be merged and returned
        finished.push(transpiledFile);
    }
    
    //return the finished task.....
    if(bdConfig.filePaths.length === 1){
        //Since there is only one file return that one... no need for merge
        return finished[0];
    }else{
        // Merge the multiple Files to return
        return merge2(finished);
    }
    
});

// compile react, js minify both...
gulp.task("js",function(){
    // A bit of code borrowed & modified from my project: https://github.com/Michael-N/Personal-Site.git
    
    //err help function
    var errNotifier = function(err){
        console.log("[React Encountered an Error: Check Syntax!]");
        console.log(`[${err.message}, line: ${err.lineNumber} column: ${err.column}, at ${err.fileName}]`);
    }
    
    //convert jsx and stream
    var jsx = gulp.src("./dev/src/javascript/*.jsx")
            .pipe(react().on("error",errNotifier));
    
    //You must tell gulp.src to ignore any files you want processed with the task buildJsDeps !!!!!!!!!!!
    var js = gulp.src(["./dev/src/javascript/*.js","!./dev/src/javascript/vendors.js"])

    
    //Merge the sources, minify,add suffix .min and send to destination....
    return merge2(js,jsx)
            .pipe(jsmin())
            .pipe(rename({
                suffix:".min",
                extname:".js"
            }))
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

//======================================== EXTRA ==============================================================================

/*
    Not used now but worked well!!!: (first success after 2 days of debug....)
    
    // ~~~ MAGIC do  not touch 
    const b = browserify();
    b.add("./dev/src/javascript/QuestionForm.jsx");
    b.transform(babelify.configure({presets: ["es2015", "react"]}));
    return b.bundle().pipe(source('QuestionForm.js')).pipe(gulp.dest('./dev/src/javascript/')); 
    
*/