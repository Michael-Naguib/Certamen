"use strict";

//Shared connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//schema + helpers
const user_schema=require("../__general__/user_schema.js");
const mkError = require("../generate/error_helper.js");

//The model
var user_model = mongoose.model("users",user_schema);


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
		var query = _.pick(data,["username"]);
		var result = user_model.find(query).cursor();

		//Check
		if(cursor.length >= 1){
			throw "User already Exists Pick another username";
		}

		//isvalid
		callback(null,data);
	}catch(e){
		//error
		callback(mkError("Data not in proper format: " + e));
	}


}
