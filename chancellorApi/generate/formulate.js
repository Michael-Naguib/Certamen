"use strict";
//const mongoose = require('mongoose');
const mkError = require("./error_helper.js");
//const question_model = require("../__general__/question_model.js");

module.exports = function(data,callback){
	
	
	try{
		var query = {
			'meta.latinLevel': data.level,
			'meta.tags':{$all: data.tags}
		};
		
		callback(null,query,data);
		
	}catch(e){
		let err = mkError("Unable to formulate Query: " + e);
		callback(mkError);
	}

}