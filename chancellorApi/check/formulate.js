"use strict";

//
const ObjectId = require('mongodb').ObjectId; 
const mkError = require("../generate/error_helper.js");

module.exports = function(data,callback){
	
	
	try{
		//save all the ids to a list
		var all_ids = [];
		for(var i=0; i<data._ids.length; i++){
			// debug console.log("+++++++++++++++++++ " + data._ids[i]._id);
			all_ids.push(ObjectId(data._ids[i]._id));
		}

		//Build the json Query 
		var query = {
			'_id':{$in:all_ids}
		};
		
		callback(null,query,data);
		
	}catch(e){
		let err = mkError("Unable to formulate Query: " + e);
		callback(mkError);
	}

}