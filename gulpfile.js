"use strict";
//Requires & Setup


//README comment to future self: not all requires are installed via npm nor in package
//Base GULP
const gulp = require('gulp');

//HTML
const jade = require("gulp-jade");
const htmlmin = require("gulp-htmlmin");

//Images
const image = require("gulp-image");

//Js
const jsmin = require("gulp-jsmin");
const react = require('gulp-react');
const concat = require('gulp-concat');

//Extra
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');

//CSS 
const cleancss = require('gulp-clean-css'); // dont forget to install this
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css'); // dont forget to install this


var fatalLevel = require('yargs').argv.fatal;
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
//use pipe().on('error',function(err){}).pipe()

var gulpPath = require('gulp-path');//install...

/*
design goals

        jade main and minify html
        compile and minify and concat js
        compile and merge and concat and prefix and minify/clean css
        
        do not forget it is possible to merge streams...
        
        friendly reminder for fps
        
        ./ current dir then folder under
        ../parent up 1 dir stackable
        ./subdir/  in the subdir assumed in current dir.....
        
        return merge2(stream1,stream2)
*/

gulp.task("stylesheets",function(){
    //Stylesheets task settings
    const stylesheetsettings = {
        sassin:"",
        cssin:"",
        cssout:"",
        concatname:"concat.css",
        dirname:"./",
        basename:"index",
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
                    dirname:stylesheetsettings.dirname,
                    basename:stylesheetsettings.basename,
                    suffix:stylesheetsettings.suffix,
                    extname:stylesheetsettings.extname
                 }))
                 .pipe(gulp.dest(stylesheetsettings.cssout));
     
});

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









//Settings and Configuration

const settings = {
    sassInDir:"dev/**/*.scss",
    sassOutDir:"./www",
    jsxInDir:"dev/**/*.jsx",
    jsxOutDir:"./www/",
    minhtmlInDir:"dev/**/*.html",
    minhtmlOutDir:"./www/",
    imageInDir:"dev/**/*.{jpg,png,svg,gif}",
    imageOutDir:"./www/assets",
    imageSubSettings:{
      pngquant: true,
      optipng: true,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 3
    },
    copyInDir:["dev/assets/**/*.*","!dev/assets/**/*.{jpg,png,svg,gif}"],
    copyOutDir:"./www"
};

 
/*
//Convert Sass(.scss) and Minify
gulp.task("sass",function(){
    return gulp.src(settings.sassInDir).pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest(settings.sassOutDir));
});

//Convert Jsx and Minify
gulp.task("jsx",function(){
    return gulp.src(settings.jsxInDir)
        .pipe(react())
		.pipe(jsmin())
		.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(settings.jsxOutDir));

});

// Manage Minify Html
gulp.task("minhtml",function(){
    return gulp.src(settings.minhtmlInDir)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename(function(path){
            path.extname = ".min.html";
        }))
        .pipe(gulp.dest(settings.minhtmlOutDir));
});

//Optimize Images
gulp.task("optimizeimages",function(){
    gulp.src(settings.imageInDir)
        .pipe(image(settings.imageSubSettings))
        .pipe(gulp.dest(settings.imageOutDir));
});

//Copy all other non precompiled files...
gulp.task("copy",function(){
    gulp.src(settings.copyInDir).pipe(gulp.dest(settings.copyOutDir));
});

//Watch all the files as the default task
gulp.task("default",function(){
    //watch sass
    gulp.watch(settings.sassInDir,["sass"]);
    
    //watch jsx
    gulp.watch(settings.jsxInDir,["jsx"]);
    
    // watch html
    gulp.watch(settings.minhtmlInDir,["minhtml"]);
    
    //watch Images ~~~ may be resource intensive ... 
    gulp.watch(settings.imageInDir,["optimizeimages"]);
    
    //Copy all other assets files over....
    gulp.watch(settings.copyInDir,["copy"]);
});

*/