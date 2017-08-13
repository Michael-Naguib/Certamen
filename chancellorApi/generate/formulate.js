"use strict";
//const mongoose = require('mongoose');
const mkError = require("./error_helper.js");
//const question_model = require("../__general__/question_model.js");

module.exports = function(data,callback){
	
	
	try{
		//Make all the strings lowercase
		for(var p =0; p<data.tags.length;p++){
			data.tags[p] = data.tags[p].toLowerCase();
		}
		
		//Build the json Query 
		var query = {
			'meta.latinLevel': data.level,
			'meta.tags':{$in: data.tags}
		};
		
		callback(null,query,data);
		
	}catch(e){
		let err = mkError("Unable to formulate Query: " + e);
		callback(mkError);
	}

}