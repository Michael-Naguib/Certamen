//Requires & Setup
var gulp = require('gulp');
var react = require('gulp-react');
var sass = require('gulp-sass');

//Settings and Configuration
const settings = {
    sassInDir:"dev",
    sassOutDir:"dev",
    jsxInDir:"",
    jsxOutDir:""
};

//Manage Sass
gulp.task("sass",function(){
    return gulp.src(settings.sassInDir).pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest(settings.sassOutDir));
});

//Manage Jsx
gulp.task("jsx",function(){
    return gulp.src(settings.jsxInDir).pipe(react()).pipe(gulp.dest(settings.jsxOutDir));
});

//Watch all the files as the default task
gulp.task("default",function(){
    //watch sass
    gulp.watch(settings.sassInDir,["sass"]);
    
    //watch jsx
    gulp.watch(settings.jsxInDir,["jsx"]);
});