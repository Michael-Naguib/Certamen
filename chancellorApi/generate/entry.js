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

//Config
const apiConfig = require("../apiCOnfig.js");

//custom
const mkError = require("./error_helper.js");

const req_recieve = require("./recieve.js");
//const req_parse = require("./parse.js"); // no longer needed ...bodyParser used
const req_sanitize = require("./sanitize.js");
const req_validate = require("./validate.js");
const que_formulate = require("./formulate.js");
const que_query = require("./query.js");
const que_sort = require("./sort.js");
const que_format = require("./format.js");
const que_encode = require("./encode.js");

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
	
	1.recieve request ---> stored in req.body thanks to bodyParser
						parse safely... no longer used b/c bodyParser
	2.sanitize --> remove weird object props such as object.@dog or object.$foo
	3.validate --> make sure the generate request matches allowed settings
	4.formulate query --> extract and figure out based off the request what to query
	5.query on the db --> run the query and get the result as a Cursor list
	6.algroithmic sort (selection)--> pick the best questions
	7.format --> i.e cut out some info... from the selected questions...
	8.encode --> stringify Json...
	9.send --> send the response to the user... 

*/
module.exports = function(req,res){
	
	waterfall([
		(callback)=>{callback(null,req);},/*0. get data into callback context*/
		req_recieve,/* 	1. RECIEVE*/
		req_sanitize,/* 2. SANITIZE*/
		req_validate,/* 3. VALIDATE*/
		que_formulate,/*4. FORMULATE*/
		que_query,/* 	5. QUERY*/
		que_sort,/* 	6. SORT*/
		que_format,/* 	7. FORMAT*/
		que_encode /* 	8. ENCODE*/
	],(err,result)=>{
		//9.SEND
		try{
			if(err){
				res.setHeader('content-type', 'application/json');
				res.status(500);
				res.send(err);
			}else{
				res.setHeader('content-type', 'application/json');
				res.status(200);
				res.send(result)
			}
		}catch(e){
			mkError("[chancellorApi-server]UNABLE TO SEND RESPONSE!!! USER GOT NOTHING:" + e);
		}

	});
}

