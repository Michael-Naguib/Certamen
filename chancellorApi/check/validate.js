"use strict";

const mkError = require("../generate/error_helper.js");
const mongoose = require('mongoose');

/*
	NOTE TO SELF _PropertyName ... the underscore property may
	be filtered out by the safe json parser????

	api.check(options,callback,auth);
	
	var objectsLikeThis = {_id:"",answer:"a"}
	var options = {
		_ids = [objectsLikeThis],
		
	}
*/

//item
var chk_item_schema = new mongoose.Schema({
	_id:{type:String,required:true},
	answer:{type:String,required:true,lowercase:true,maxlength:1}
});
//schema
var chk_schema = new mongoose.Schema({
	_ids:[chk_item_schema]
});

//model								this meaning: check answer api route
var chk_model = mongoose.model("check_request",chk_schema);


//this is unique for each type of route!!
module.exports = function(data,callback){
	try{
		var test = new chk_model(data);
		var err = test.validateSync();
		if(err){
			throw err;
		}
		callback(null,data);
	}catch(e){
		//error
		callback(mkError("Data not in proper format: " + e));
	}
	
	//isvalid
	
}