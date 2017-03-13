//Requires & Setup
const gulp = require('gulp');
const react = require('gulp-react');
const sass = require('gulp-sass');
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const jsmin = require("gulp-jsmin");
const image = require("gulp-image");


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
		/*
		
		*/
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