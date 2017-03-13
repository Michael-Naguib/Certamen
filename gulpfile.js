//Requires & Setup
const gulp = require('gulp');
const react = require('gulp-react');
const sass = require('gulp-sass');
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");

//Settings and Configuration
const settings = {
    sassInDir:"dev/",
    sassOutDir:"www/stylesheets/",
    jsxInDir:"dev/",
    jsxOutDir:"www/javascript/",
    minhtmlInDir:"dev",
    minhtmlOutDir:"www/markup/"
};

//Manage Sass
gulp.task("sass",function(){
    return gulp.src(settings.sassInDir)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(settings.sassOutDir));
});

//Manage Jsx
gulp.task("jsx",function(){
    return gulp.src(settings.jsxInDir)
        .pipe(react())
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

//Watch all the files as the default task
gulp.task("default",function(){
    //watch sass
    gulp.watch(settings.sassInDir,["sass"]);
    
    //watch jsx
    gulp.watch(settings.jsxInDir,["jsx"]);
    
    // watch html
    gulp.watch(settings.minhtmlInDir,["minhtml"]);
});