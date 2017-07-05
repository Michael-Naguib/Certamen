"use strict";
//requires
const _ = require("lodash");
const mkError = require("./error_helper.js");

module.exports = function(dirty_data,callback){
	try{
		//one step cleaning
		var cleaner_data = _.pick(dirty_data,["quantity","tags","level","avgDifficulty","avgSize"]);
		
		callback(null,cleaner_data);
		
	}catch(e){
		callback(mkError("Data was too dirty; please adhear to api docs for data submission" + e),false);
	}
}