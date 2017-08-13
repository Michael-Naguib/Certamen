"use strict";
//requires
const _ = require("lodash");
const mkError = require("../generate/error_helper.js");

module.exports = function(dirty_data,callback){
	try{
		//one step cleaning
		var clean_data = _.pick(dirty_data,["newUser"]);
		var cleaner_data = _.pick(clean_data.newUser,["username","password","email"]);
		callback(null,cleaner_data);

	}catch(e){
		callback(mkError("Data was too dirty; please adhear to api docs for data submission" + e),false);
	}
}
