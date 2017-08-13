"use strict";

//Shared connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//schema + helpers
const user_schema=require("../__general__/user_schema.js");
user_schema.set("versionKey",false);
const mkError = require("../generate/error_helper.js");

//The model
var user_model = mongoose.model("users",user_schema);

//Modules:
const _ = require("lodash");

//this is unique for each type of route!!
module.exports = function(data,callback){
	try{
		//Test to see if it is at least valid
		var test = new user_model(data);
		var err = test.validateSync();
		if(err){
			throw err;
		}

		//Query the database to make sure it does not already exist
		// find by username:
		var _username= _.pick(data,["username"]);
		var query = {username:_username.username}
		//query
		user_model.findOne(query,(err,found)=>{
			if(err){
				callback(mkError("error while testing if username taken :" + err));
			}else if(found){
				var taken_msg = `User ${_username} already Exists Pick another username`;//Orex was here
				callback(mkError(taken_msg));
			}else{
				callback(null,data);
			}
		});

	}catch(e){
		//error
		callback(mkError("Data not in proper format: " + e));
	}


}
