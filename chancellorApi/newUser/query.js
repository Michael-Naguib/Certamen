"use strict";
//Helper function
const mkError = require("../generate/error_helper.js");
var mkSuccess = function(msg,extra){
	console.log("[chancellorApi-server] "+ msg);
	var data = {success:"[chancellorApi-server] "+ msg};
	if(extra){
		data.extra = extra;
	}
	return JSON.stringify(data);
}

//Schema
const user_schema = require("../__general__/user_schema.js");

//Conection Setup~ (shared from devserver.js)
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = function(data,callback){

	try{
		// Shared connection used across the server.... defined in devserver.js
		var user_model = mongoose.model("users",user_schema);

		//create an instance
		var newUser = new user_model(data);

		//save it:
		newUser.save((err,model_instance)=>{
			if(err){
				callback(mkError("Query to insert Errored: " + err));
			}else{
				callback(null,mkSuccess("Success",{enteredUsername:data.username}));
			}
		});

	}catch(e){
		var err = mkError("Querying the database failed " + e);
		callback(err);
	}
}
