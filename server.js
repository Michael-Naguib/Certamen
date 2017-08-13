"use strict";
//Command line args
var program = require("commander");

//Use configuration
const config = require('config');
const serverConfig = config.get("server");

//~~Modules:
//do not use the  deprecated mongoose default~~~
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Generate & Store the Sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Authentication
const passport = require("passport");
var myStrategy = require("./chancellorApi/authenticate/strategy.js");
const localApiKey = require("passport-localapikey");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;

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

//Chancellor API
const chancellorApi = require("./chancellorApi/chancellorApi-server.js");
const mkError = require("./chancellorApi/generate/error_helper.js");//Really usefull...

//Php Integration
var phpExpress = require('php-express')({

  // assumes php is in your PATH
  binPath: serverConfig.phpBin
});


/*
**		# A few notes about the code:
**		+ Be sure to set settings for Production and Devlopment Environments
**		+ If you are wordering why some settings in the default or production .json files are
**		  not working that may be because since they are read only _.pick() lodash was used... filters
**		  to make a new writale object
*/

//Command Line Arguments:

program.version("0.1.0")
.option('-d --dev','Runs the server in dev mode, defaults production, verbose in notifications, will fail Catestrophically instead of handeling errs')
.option('-p --port <n>','Specify a port for the server to run on, overrides server config ',parseInt)
.option('-r --root [value]','Specify the root directory of the server relative to this script; defaults to the server config')
.option('-i --index [value]','Specify the default served path for request to http://hostname:port/ ;defaults to server config')
.option('-m --mongoprevent','Prevents the shared database connection from initializing, may cause errors for code that uses this!!')
.option('-a --phpprevent','Stops the parsing of php files as dynamic documents and serves them statically')
.option('-t --testfatal','Runs a test as a fatal admin notifing error')
.parse(process.argv);

//Main code
try{

	//======== Test the admin notifying system
	if(program.testfatal){
		mkError("-t --testfatal arg was called: this is a simulated error",{fatal:true});
	}

	//======== Setup the app
	var app = express();


	//======== Specify Port:
	if(program.port){
		app.set('port',program.port);
	}else{
		app.set('port', serverConfig.port);
	}


	//======== Setup SHARED(~efficient~) Mongo DB connection
	var mongoConfig = config.get("mongodb");
	//config object is not writable... make a copy that is writable....
	var mongoConfig = _.pick(mongoConfig,["host","port","db","user","pass"]);
	var mongoUrl= 'mongodb://';
	if(mongoConfig.user && mongoConfig.pass){ // Format the connection URL
		mongoUrl += `${mongoConfig.user}:${mongoConfig.pass}@`;
	}
	mongoUrl += `${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.db}`;
	if(!program.mongoprevent){// cmd line arg when enabled prevents setting up connetion
		mongoose.connect(mongoUrl,{useMongoClient:true});//globaly shared connection
	}


	//======== Setup Passport
	passport.use(myStrategy.useMe);
	passport.deserializeUser(myStrategy.deserialize);
	passport.serializeUser(myStrategy.serialize);


	//======== Setup Session:
	var sessionConfig = config.get("session");
	//config object is not writable... make a copy that is writable....
	sessionConfig = _.pick(sessionConfig,["secret","resave","saveUninitialized","cookie","store"]);
	//TO FUTURE SELF: this may cause an error querying?
	sessionConfig.store = new MongoStore({ mongooseConnection: mongoose.connection });
    if(!program.mongoprevent){
        	app.use(session(sessionConfig));
    }



	//======== Authenticate/Prep on session
    if(!program.mongoprevent){
        app.use(passport.initialize());
        app.use(passport.session());
    }


	//======== For security purposes: prevent vulenerabilities exploits
	app.use(helmet());


	//======== Parse only JSON Requests
	var jsonConfig = config.get("jsonParse");
	var jsonConfig = _.pick(jsonConfig,["type"]);
	app.use(bodyParser.json(jsonConfig));


	//======== Generate Route for the chancellorApi.generate();
	//var Cauth = passport.authenticate('local', { failureRedirect: '/' });//,Cauth
	app.use(chancellorApi.path,chancellorApi.router);


	//Configure the directory to serve:
	var serveThisAsRoot =serverConfig.root;//default
	if(program.root){//command line option
		serveThisAsRoot = program.root;
	}


	//======== Php Routing and templating engine
	if(!program.phpprevent){
		app.set('views', path.join(__dirname, serveThisAsRoot));
		app.engine('php', phpExpress.engine);
		app.set('view engine', 'php');
		app.all(/.+\.php$/, phpExpress.router);//get all php files! --> overrides static serving
	}


	//======== Serve the root Default Document:
	app.get('/', function(req, res){
		//Use commandline arg if provided else default to the the settings located in ./config/default.json
		if(program.index){
			res.sendFile(program.index, { root: path.join(__dirname, serveThisAsRoot) } );
		}else{
			res.sendFile(serverConfig.index, { root: path.join(__dirname, serveThisAsRoot) } );
		}

	});


	//======== Staticly Serve anything else:
	app.use(express.static(path.join(__dirname, serveThisAsRoot)));


	//======== Listen for requests
	var Server = app.listen(app.get('port'),()=>{
		//Extract some server info...
		let port = Server.address().port;
		let serverType = process.env.NODE_ENV || "default"; // Dev ? Prod

		//Server Listening Message
		let serverStartMsg = `[${serverType} Server] listening on port ${port} hosting ${serveThisAsRoot}`;
		console.log(chalk.magenta(serverStartMsg));

		//if arg is enabled then no connection was set up...
		if(!program.mongoprevent){
			//Notify the details of the mongo Connection to the server log... (WARN: includes user password in mongoUrl)
			let mongoConStartMsg = `[${serverType} Server] shared mongo conection on ${mongoUrl}`;
			console.log(chalk.green(mongoConStartMsg));
		}else{
			var mongoConWarning = "[Warning] Command line arg -m --mongoprevent was given to the server, no globally shared connection was made!!!!";
			console.log(chalk.yellow(mongoConWarning));
		}
	});


}catch(e){
	//process.env.NODE_ENV === "devlopment" ... currently using cmd line config
	if(program.dev){
		throw e; // FAIL Catestrophically in devlopment
	}else{
		// FAIL Gracefully(ie. server not crash & email to Admin) in production
		console.log(mkError("Server Crashed: some error all else failed :"+e,{fatal:true,returnAsText:true}));
	}
}
