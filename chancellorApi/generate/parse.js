"use strict";

//Safely parse json
const safe_json_parse = require("json-safe-parse");

const mkError = require("./error_helper.js");

const gen_parser = function(data,callback){
	/*
	try{
		var safely_parsed = safe_json_parse(data);
		
		callback(null,safely_parsed);
	}catch(e){
		
		callback(mkError("Unable to parse the request invalid JSON" + e),false);
	}
	*/
	
	callback(null,data);//uses bodyparser.json....
}


module.exports = gen_parser;