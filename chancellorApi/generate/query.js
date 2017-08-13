"use strict";
//Helper function
const mkError = require("./error_helper.js");

//Schema
const question_schema = require("../__general__/question_schema.js");

//Conection Setup~ (shared from devserver.js)
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = function(query,data,callback){
	
	try{
		// Shared connection used across the server.... defined in devserver.js
		var question_model = mongoose.model("question",question_schema);
		let query_results = question_model.find(query).cursor();
		callback(null,query_results,data);
		
	}catch(e){
		var err = mkError("Querying The database failed " + e);
		callback(err);
	}
}
