"use strict";

const mkError = require("./error_helper.js");
const mongoose = require('mongoose');

var __tag__helper = {validator:function(items){
	return items.every((v) => typeof v === 'string');
}};

var gen_schema = new mongoose.Schema({
	quantity:{type: Number,max:40,min:1,required:true},
	tags:{type: Array,required:true,validate:__tag__helper},
	level:{type:Number,min:0,max:5,required:true},
	avgDifficulty: {type: Number,min:1,max:10,required:false,default: 5},
	avgSize:{type:Number,min:1,max:3,required:false,default:2}
});

//model
var gen_model = mongoose.model("generate_request",gen_schema);


//this is unique for each type of route!!
module.exports = function(data,callback){
	try{
		var test = new gen_model(data);
		var err = test.validateSync();
		if(err){
			throw err;
		}
		callback(null,data);
	}catch(e){
		//error
		callback(mkError("data not in proper format: " + e));
	}
	
	//isvalid
	
}