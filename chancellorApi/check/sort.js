"use strict";
const mkError = require("../generate/error_helper.js");

module.exports = function(query_results,data,callback){
	try{
		var allDocs = [];
		query_results.on('error',(err)=>{
			callback(mkError("Unable to rank the results " + err));
		}).on('data',(q_doc)=>{
			//Unknown the order which the server will return the items...
			var docFromDbId = String(q_doc._id);// this should be q_doc._id._id BUT that FAILED this works Why? idk
			var docFromDbAnswer = q_doc.question.correctAnswer;
			
			var docFromApiAnswer="";
			
			//figure out which answer is the user answer and set userAnswer
			for(var k=0;k<data._ids.length;k++){
				let testId = data._ids[k]._id;
				console.log(testId === docFromDbId);
				if(testId === docFromDbId){
					
					
					docFromApiAnswer = data._ids[k].answer;
				}
			}
			
			var modified_doc = {};
			modified_doc._id = docFromDbId;
			modified_doc.correct= (docFromApiAnswer === docFromDbAnswer)? true:false;
			modified_doc._answerChoice = docFromDbAnswer;
			modified_doc._sentAnswer = docFromApiAnswer;
			modified_doc._timestamp =  new Date();
			
			allDocs.push(modified_doc);
		}).on('close',()=>{
			callback(null,allDocs);
		});
	}catch(e){
		callback(mkError("Unable to rank the results " + e));
	}
}