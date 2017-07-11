"use strict";
//Modules:
const req_recieve=require("../generate/recieve.js");
const req_sanitize=require("./sanitize");
const req_securify=require("./securify.js");
const req_validate=require("./validate.js");
const que_query=require("./query.js");

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
    -1.authenticate old user..
	1.recieve request ---> stored in req.body thanks to bodyParser
	2.sanitize --> remove weird object props such as object.@dog or object.$foo
    2 1/2. securify --> form passwordHash and randomize salt on object...
	3.validate --> ensure that user is not already in the db (query by username and email)
	5.query on the db --> insert the new USER --> try/fail?
	9.send --> send the response to the user...

*/
module.exports = function(req,res){
/*
request body should  have:
newUser:{
    username:"",
    password:"",
    email:""
}

*/
	waterfall([
		(callback)=>{callback(null,req);},/*0. get data into callback context*/
		req_recieve,/* 	1. RECIEVE*/
        req_sanitize,/* 2. SANITIZE*/
        req_securify,/* 2 1/2. SECURIFY*/
		req_validate,/* 3. VALIDATE*/
		que_query,/* 	5. QUERY*/
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
