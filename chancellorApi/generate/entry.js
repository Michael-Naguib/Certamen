"use strict";

//backend
const _ = require("lodash");
const waterfall = require("async/waterfall");

//Normalize objects
const json_normalize = require("json-normalizer");

//Safely parse json
const safe_json = require("json-safe-parse");

//check if it meets requirements
const validator = require('validator');

//pick one
const mongoose = require('mongoose');
//or
//const MongoClient = require('mongodb').MongoClient;
//const assert = require("assert");

//Config
const apiConfig = require("../apiCOnfig.js");

//custom
const mkError = require("./error_helper.js");

const req_recieve = require("./recieve.js");
const req_parse = require("./parse.js");
const req_sanitize = require("./sanitize.js");
const req_validate = require("./validate.js");
const que_formulate = require("./formulate.js");
const que_query = require("./query.js");
const que_sort = require("./sort.js");

//schema for querying
const question_model = require("../__general__/question_schema.js");

//Quick response~ testing purposes only
var mkSuccess = function(msg,extra){
	console.log("[chancellorApi-server] "+ msg);
	var data = {success:"[chancellorApi-server] "+ msg};
	if(extra){
		data.extra = extra;
	}
	return JSON.stringify(data);
}

/*
	~~ OUTLINE ~~
	
	recieve request
	parse safely
	sanitize
	----------------- normalize?
	validate
	formulate query
	query
	algroithmic sort (selection)
	format --> i.e cut out some info...
	stringify---> Json...
	send

*/
module.exports = function(req,res){
	waterfall([
		(callback)=>{callback(null,req);},
		req_recieve,
		req_parse,
		req_sanitize,
		req_validate,
		que_formulate,
		que_query,
		que_sort,
		(data,callback)=>{
			var timestamp = new Date();
			res.send(mkSuccess("It worked !! generated at "+ timestamp,data))
		}
	],(err,result)=>{
		if(err){
			res.status(500);
			res.send(err);
		}
	});
}

