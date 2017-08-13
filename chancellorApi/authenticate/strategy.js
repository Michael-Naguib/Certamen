"use strict";
//Authentication
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Hashes = require('jshashes');
var SHA1 = new Hashes.SHA1();

//Querying
const userSchema = require("../__general__/user_schema.js");
const mongoose = require("mongoose"); //holds the sharred connection object
mongoose.Promise = global.Promise;
const ObjectId = require('mongodb').ObjectId; 

//helper function
const mkError = require("../generate/error_helper.js");

module.exports.useMe = new LocalStrategy((user,pass,callback)=>{
		
	//Find By Username Query:
	var by_Username = {
		username:user
	}
		
	//Set up a model to query by
	var User_Model= mongoose.model("users",userSchema);
		
	//
	User_Model.findOne(by_Username,(err,result)=>{
		if(err){ 
			var error_msg = mkError("Auth: error " + err);
			return callback(errror_msg);
		}
		else if( !result){
			mkError("Auth: Username not found: "+ user);
			return callback(null,false);
		}else if( SHA1.hex(pass + result.salt) !== result.passwordHash ){
			mkError("Auth: Incorrect password: "+ pass);
			// the above checks if the hashes match...
			return callback(null,false);
		}
		return callback(null,result);
	});
		
		
});


module.exports.serialize = function(user,callback){
	callback(null,user._id);// should be ._id._id but that fails... this works????
}

module.exports.deserialize = function(id,callback){
	var User_Model= mongoose.model("user",userSchema);
	User_Model.findOne({_id:ObjectId(id)},(err,response)=>{
		if(err){
			mkError("Auth: Unable to deserialize" + err);
			callback(err);
		}else if(!response){
			callback(null,false);
		}else{
			callback(null,response);
		}
	});
}
	