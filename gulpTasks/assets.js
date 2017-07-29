"use strict";

//Setup
const gulp = require("gulp");
const merge2 = require('merge2');
const rename = require("gulp-rename");
const fs = require('fs');
var fatalLevel = require('yargs').argv.fatal;
var plumber = require('gulp-plumber');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var gulpPath = require('gulp-path');
const image = require("gulp-image");

/*
    # Design Goals
    + Handle all files located in ./dev/assets
    + Export them to ./www/assets
    + Preform specific optimizations on specific files/types
    + Hashes?
*/
