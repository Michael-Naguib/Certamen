"use strict";

const question_schema=require("./__general__/question_schema.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var con = mongoose.connect("mongodb://localhost:27017/chancellorApi",{useMongoClient:true});

con.then(function(db){
	
	var data={
		question:{
			mainQuestion:"This is the main thing that is being asked?",
			additionalPrompt:"A prompt/paragraph with additional info.",
			helps: "Anything to help the person seeing the question",
			answerChoices:{
				a:"The answer choice for label: a",
				b:"The answer choice for label: b",
				c:"The answer choice for label: c",
				d:"The answer choice for label: d",
				e:"The answer choice for label: e",
			},
			correctAnswer:"The letter of the correct answer"
		},
		reported:{
			incorrect:0,
			mistake:0,
			inappropriate:0,
			flagedByMod: false
		},
		meta:{
			tags:["foo","bar","baz"],
			difficulty:5,
			latinLevel: 4,
			size: 2,
			entryDate: new Date(),
			lastModified: new Date(),
			author: "SYSADMIN",
			questionYear: new Date(),
			popularity: 100
		},
		userStatistics:{
			totalAnsweredIncorrect:0,
			totalAnsweredCorrect:0,
			avgTimeSpent:0,
			totalUsersVisited: 0
		},
		universalId:" a unique identifier... hash?"
}
	
	var qm = db.model("question",question_schema);
	var test_q = new qm(data);
	
	test_q.save(function(err,item){
		if(err){
			console.log("err: "+ err);
		}else{
			console.log("saved item: "+ item);
		}
	});
});