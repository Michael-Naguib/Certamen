"use strict";

const waterfall = require("async/waterfall");

//~~~ Borrowed a few files from the generate route....

//borrow from generate route~consider migrating file...
const mkError = require("../generate/error_helper.js");
const req_recieve = require("../generate/recieve.js");
const req_parse = require("../generate/parse.js");
const req_validate = require("./validate.js");
const que_formulate = require("./formulate.js");
const que_query = require("../generate/query.js");
const que_sort = require("./sort.js");
//que_format ---> que_sort does this for this api route... made more sense...
const que_encode = require("../generate/encode.js");

/*

SEE ../generate/entry.js for pattern....

This code could be heavily optimized and DRY ....
*/




module.exports = function(req,res){
	waterfall([
		(callback)=>{callback(null,req);},
		req_recieve,
		req_parse,
		req_validate,
		que_formulate,
		que_query,
		que_sort,
		que_encode
		
	],(err,result)=>{
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
			console.log("[chancellorApi-server]UNABLE TO SEND RESPONSE!!! USER GOT NOTHING:" + e);
		}

	});
}