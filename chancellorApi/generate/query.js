"use strict";
const mkError = require("./error_helper.js");
const question_schema = require("../__general__/question_schema.js");
const mongoose = require("mongoose");

//do not use the  deprecated mongoose default~~~
mongoose.Promise = global.Promise;
const apiConfig = require("../apiConfig.js");

module.exports = function(query,data,callback){
	
	try{

		var url = `mongodb://${ apiConfig.database.host}:${apiConfig.database.port}/${apiConfig.database.db}`;
		console.log(url);
		var con = mongoose.connect(url,	{useMongoClient: true});
		con.then(function(db){
			var question_model = db.model("question",question_schema);

			let query_results = question_model.find(query).cursor();

			callback(null,query_results,data);
			
		}).catch((e)=>{
			
			//ADMIN README!!!!!!!! e MAY CONTAIN SENSATIVE CONNECTION INFO !!!! DEBUG PURPOSES ONLY
			//var err = mkError("Querying The database failed:" + e);
			var err = mkError("Querying The database failed: could not connect( ADMIN? 'see line 26 in query.js' : 'contact ADMIN')");
			callback(err);
		});
		
	}catch(e){
		var err = mkError("Querying The database failed " + e);
		callback(err);
	}
}
