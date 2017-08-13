"use strict";
const mkError = require("./error_helper.js");

/*
**
**
**		This Module takes ANY object and converts it to Json
**
**		callback recieves two properties see example below:
**		
**		const jsonEncoder = require("./encode.js");
**		var myDataObject = {foo:"bar"};
**		var myCallback = function(err,encoded_in_json_data){  ** DO STUFF ** }
**		jsonEncoder(myDataObject,myCallback);
**
*/

module.exports = function(data,callback){
	try{
		//encode the json
		var encoded_data = JSON.stringify(data);
		// debugging console.log(encoded_data);
		
		//Callback
		callback(null,encoded_data);
		
	}catch(e){
		
		//If there is an error....
		var err = mkError("Unable to convert response to JSON: "+ e);
		callback(err);
	}
}