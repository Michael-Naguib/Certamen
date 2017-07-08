"use strict";

const question_schema=require("./__general__/question_schema.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var con = mongoose.connect("mongodb://localhost:27017/chancellorApi",{useMongoClient:true});

con.then(function(db){
	
	var data={
		question:{
			mainQuestion:"Who is Jason's wife according to greek mythology",
			additionalPrompt:"",
			helps: "",
			answerChoices:{
				a:"Circe",
				b:"Medea",
				c:"Andromeda",
				d:"Pelia",
				e:"Lennia",
			},
			correctAnswer:"b"
		},
		reported:{
			incorrect:0,
			mistake:0,
			inappropriate:0,
			flagedByMod: false
		},
		meta:{
			tags:["history","jason","ship","greek","argonauts","golden fleece","black sea","lemnos","doilones","pelias","myth","quest"],
			difficulty:3,
			latinLevel: 4,
			size: 2,
			entryDate: new Date(),
			lastModified: new Date(),
			author: "Michael N.",
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