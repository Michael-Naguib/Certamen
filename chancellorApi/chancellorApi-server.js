"use strict";
//========= Modules
//Setup the Router Middleware
const express = require("express");
const router = express.Router();

//Error helper
var mkError = require("./generate/error_helper.js");

//For Authenticating
const passport = require("passport");
var myStrategy = require("./authenticate/strategy.js");

//Api Settings
const apiConfig = require("./apiConfig.js");

//======= Authentication
//Just add where-ever Authentication is required
var Authenticate = passport.authenticate('local', { failureRedirect: '/chancellorApi'+apiConfig.routes.unauthorized});

//======= Routing 
//Route all Unauthorized to this..
const unauth = require("./unauthorized/unauthorized.js");
router.get(apiConfig.routes.unauthorized,unauth);
//router.post(apiConfig.routes.unauthorized,unauth);

//Generate Path 
const gen = require("./generate/entry.js");
router.post(apiConfig.routes.generateRoute,Authenticate,gen);

//Check Path:
const chk = require("./check/entry.js");
router.post(apiConfig.routes.checkRoute,Authenticate,chk);

//====== Export it
module.exports = {router:router,path: apiConfig.apiEntry};