"use strict";


module.exports = function(req,callback){
	/*
	var body = [];
	req.on('data', function(chunk) {
  		body.push(chunk);
	}).on('error',function(err){
		callback(mkError("Was unable to recieve the http request body" + err ,false));
	}).on('end', function() {
  		body = Buffer.concat(body).toString();
		callback(null,body);
	});
	*/
	
	//Thanks to bodyparser this is handled...
	callback(null,req.body);
}
