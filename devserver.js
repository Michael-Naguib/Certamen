"use strict";
//Command Manager ~not being used currently... 
//const commander = require("commander");

//Use configuration
const config = require('config');
const serverConfig = config.get("server");

//~~Modules:

//Paths...
const path = require("path");

//Help with objects n stuff + JSON
const _ = require("lodash");
const bodyParser = require("body-parser");

//For Logging to the console...
const chalk = require("chalk");

//Express Framework
const express = require("express");

//Helps to prevent security vulnerabilities 
const helmet = require('helmet');

//do not use the  deprecated mongoose default~~~
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Generate & Store the Sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Authentication
const passport = require("passport");
const localApiKey = require("passport-localapikey");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Chancellor API
const chancellorApi = require("./chancellorApi/chancellorApi-server.js");
const mkError = require("./chancellorApi/generate/error_helper.js");//Really usefull...

/*
**			A few notes about the code:
**  		+ A shared mongo db connection promise is stored in MongoDbConnection
**			+ Be sure to set settings for Production and Devlopment Environments 
**			+ If you are wordering why some settings in the default or production .json files are
**			  not working that may be because since they are read only _.pick() lodash was used... filters
**			  to make a new writale object
*/

//Main code
try{
	
	//======== Setup the app
	var app = express();
	app.set('port', serverConfig.port);
	
	//======== Setup SHARED(~efficient~) Mongo DB connection
	var mongoConfig = config.get("mongodb");
	//config object is not writable... make a copy that is writable....
	var mongoConfig = _.pick(mongoConfig,["host","port","db","user","pass"]);
	var mongoUrl= 'mongodb://';
	if(mongoConfig.user && mongoConfig.pass){ // Format the connection URL
		mongoUrl += `${mongoConfig.user}:${mongoConfig.pass}@`;
	}
	mongoUrl += `${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`;
	var MongoDbConnection=mongoose.createConnection(mongoUrl,{useMongoClient:true});
	
	//======== Setup Session:
	var sessionConfig = config.get("session");
	//config object is not writable... make a copy that is writable....
	sessionConfig = _.pick(sessionConfig,["secret","resave","saveUninitialized","cookie","store"]);
	//TO FUTURE SELF: this may cause an error querying?
	sessionConfig.store = new MongoStore({ dbPromise: MongoDbConnection });
	app.use(session(sessionConfig));

	//======== For security purposes: prevent vulenerabilities exploits
	app.use(helmet());
	
	//======== Parse only JSON Requests
	var jsonConfig = config.get("jsonParse");
	var jsonConfig = _.pick(jsonConfig,["type"]);
	app.use(bodyParser.json(jsonConfig));
	
	//======== Generate Route for the chancellorApi.generate();
	app.use(chancellorApi.path,chancellorApi.router);

	//======== Staticly Serve anything else:
	app.use(express.static(path.join(__dirname, serverConfig.root)));

	//======== Listen for requests
	var Server = app.listen(app.get('port'),()=>{
		//Extract some server info...
		let port = Server.address().port;
		let serverType = process.env.NODE_ENV || "default"; // Dev ? Prod
		
		//Server Listening Message
		let serverStartMsg = `[${serverType} Server] listening on port ${port} hosting ${serverConfig.root}`;
		console.log(chalk.magenta(serverStartMsg));
		//Notify the details of the mongo Connection to the server log... (WARN: includes user password in mongoUrl)
		let mongoConStartMsg = `[${serverType} Server] shared mongo conection on ${mongoUrl}`;
		console.log(chalk.green(mongoConStartMsg));
	});
}catch(e){	
	if(process.env.NODE_ENV === "devlopment"){
		throw e; // FAIL Catestrophically in devlopment
	}else{
		// FAIL Gracefully(ie. server not crash & email to Admin) in production
		console.log(mkError("Server Crashed: some error all else failed :"+e,{fatal:true,returnAsText:true}));
	}
}
