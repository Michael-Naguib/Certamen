"use strict";
const chalk = require("chalk");
var sendmail = require("sendmail")({silent:true});

var apiConfig = require("../apiConfig.js");
var dateFormat = require('dateformat');

//OLD
/*
module.exports = function(message,stopjsonify){
	var finishedMessage = "[chancellorApi-server] " + message
	console.log("[chancellorApi-server] ERR : " + message);
	if(!stopjsonify){
		return JSON.stringify({error: finishedMessage});
	}
	
	return finishedMessage;
}
*/
//Proposed new error handler

module.exports = function (message,_options){
	/*
		message: what you want to be said
	
		var options = {
			fatal: bool default false,
			notifyAdmins: bool default false unless fatal,
			returnAsText: bool defaults false --> returns json,
			location: string --> any clue as to where the error is from... will be added onto message,
			timestamp: bool defaults true
		};
	*/
	//prevent undefined err
	var options = _options || {};
	//set defaults:
	options.fatal = options.fatal || false;
	options.notifyAdmins = options.notifyAdmins || false;
	options.returnAsText = options.returnAsText || false;
	options.location = options.location || false;
	options.timestamp = options.timestamp || true;
	
	//Text
	var errorText =chalk.green("[chancellorApi-server] ");
	var __no_color_text = "[chancellorApi-server] ";
	
	//Timestamp
	if(options.timestamp){
		var t_now = new Date();
		var t_stamp = dateFormat(t_now,"mmmm dS, h:MM:ss TT") + " ";
		errorText = errorText + t_stamp;
		__no_color_text = __no_color_text + t_stamp;
	}
	
	//Location
	if(options.location){
		errorText = errorText + " At "+options.location + " ";
		__no_color_text = __no_color_text+ " At "+options.location + " ";
	}
	
	//Add the user's message
	if(options.fatal){
		errorText = errorText + " " + chalk.red(message);
		__no_color_text = __no_color_text + " " + message;

	}else{
		errorText = errorText + " " + chalk.yellow(message);
		__no_color_text = __no_color_text + " " + message;
	}
	
	
	//notify with msg
	function notifyAdminsEmail(msg,callback){
		try{
			//Concat email strings
			var _email_string = "";
			for(var p=0; p<apiConfig.error.admins.length;p++){
				if(p === 0){
					_email_string = _email_string + apiConfig.error.admins[p];
				}else{
					_email_string = _email_string +"," +apiConfig.error.admins[p];
				}
			}
			//send the email
			sendmail({
				from:"chancellorApi.server@localhost",
				to: _email_string,
				subject: "chancellorApi-server ERROR",
				html: msg
			},(err,reply)=>{
				if(err){
					callback(err);
				}else{
					callback(null);
				}
			});
		}catch(e){
			callback(e);
		}

		
		
	}
	
	//If fatal
	if(options.fatal || options.notifyAdmins){
		notifyAdminsEmail(__no_color_text,(err)=>{
			if(err){
				console.log(chalk.red("[chancellorApi-server] UNABLE TO SEND EMAIL TO ADMIN"+ err));
			}
		});
	}
	
	//Log it to server console
	console.log(errorText);
	
	//returned so it can be passed to user
	if(options.returnAsText){
		return errorText;
	}else{
		return JSON.stringify({error: __no_color_text});
	}
	
}