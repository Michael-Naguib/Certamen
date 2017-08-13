"use strict";

/*

        ## NOTE!
        * this could be combined with the assets task
        * this is almost a repete of that task
        * isomorphipically route the file types based on src
*/

//Setup
const gulp = require("gulp");

//Copy over
gulp.task('php',function(){
    //settings
    const phpsettings = {
        phpin:"../dev/php/*.*",
        phpout:"../www/php/"
    };

    // Copy all php over
    return gulp.src(phpsettings.phpin)
    .pipe(gulp.dest(phpsettings.phpout));
});
