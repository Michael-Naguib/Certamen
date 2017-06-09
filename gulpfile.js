"use strict";

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
// also npm babel-preset-es2015 & babel-preset-react

// Extra requires
const merge2 = require('merge2');
const rename = require("gulp-rename");
const path = require('path');// node native

/*
    Note to Self: browserifyFile function auto returns a buffered vinyl stream!!! ( i feel like this may cause errors in the future...)


*/

gulp.task("default",function(){

});

// Convert ES6 with JSX syntax to JS and bundle their dependancies from import; pass a FILEPATH!
function browserifyFile(myFilePath,fileNewName){
    // ~~~ Duplicate MAGIC do  not touch  
    const b = browserify();
    
    // Each file processed seperatly
    b.add(myFilePath);
    
    //Run through ES6 then React-JSX transpiler
    b.transform(babelify.configure({presets: ["es2015", "react"]}));
    
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


/*
    Not used now but worked well!!!: (first success after 2 days of debug....)
    
    // ~~~ MAGIC do  not touch 
    const b = browserify();
    b.add("./dev/src/javascript/QuestionForm.jsx");
    b.transform(babelify.configure({presets: ["es2015", "react"]}));
    return b.bundle().pipe(source('QuestionForm.js')).pipe(gulp.dest('./dev/src/javascript/')); 
    
*/