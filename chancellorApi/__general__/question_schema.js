"use strict";
const mongoose = require('mongoose');

/*


#Question Model
* Json (pretty print view + description)
```
{
	question:{
		mainQuestion: the main question being asked,
		additionalPrompt: any prompt with additional info,
		helps: text to help the user,
		answerChoices:{
			a:,
			b:,
			c:,
			d:,
			e:
		},
		correctAnswer: the letter of the correct answer
	},
	reported:{
		incorrect:,
		mistake: there is a mistake in the question,
		inappropriate:,
		flagedByMod: bool true or false
	},
	meta:{
		tags: list of tags,
		difficulty:  1 to 10 being hard,
		latinLevel:  int the indicy of the level in the coresponding list ['I','II','III','III Prose','IV','IV Poetry'],
		size: int 1 2 or 3  coresponding small med large,
		entryDate: date in unicode,
		lastModified: date in unicode,
		author: the most current author or modifier,
		questionYear: the year the question was on JCL tests,
		popularity: how often should this question be used?
	},
	userStatistics:{
		totalAnsweredIncorrect:,
		totalAnsweredCorrect:,
		avgTimeSpent: time spent on the question,
		totalUsersVisited: how many times have users been presented this question?
	},
	universalId: a unique identifier... hash?,
	__id: ~~~mongo's unique identifier~~~
}

```

*/


/*
	~~General Schema outline~~
	
	question_schema: question_schema
		question: question_schema_sub
			answerChoices: answerChoices_schema
		reported:reported_schema
		meta:meta_schema
		userStatistics:userStatistics_schema
		
*/

// Child schemas:
// Answer Choices
var answerChoices_schema = new mongoose.Schema({
	a: {type: String,required:true},
	b: {type: String,required:true},
	c: {type: String,required:true},
	d: {type: String,required:true},
	e: {type: String,required:true}
});

//Question
var  question_schema_sub = new mongoose.Schema({
	mainQuestion: {type: String, required:true},
	additionalPrompt: {type: String, required:false},
	helps: {type: String, required:false},
	answers: answerChoices_schema,
	correctAnswer:{type:String,lowercase:true,match:"[ABCDEabcde]",required:true}
});

//Reported
var reported_schema = new mongoose.Schema({
	incorrect: {type:Number},
	mistake:{type:Number},
	inappropriate:{type:Number},
	flagedByMod: Boolean
});

//Meta
var meta_schema = new mongoose.Schema({
	tags:[{type:String,lowercase:true}],
	difficulty: {type: Number,min:1,max:10,required:true},
	latinLevel:{type:Number,min:0,max:5,required:true},
	size:{type:Number,min:1,max:3,required:true},
	entryDate:{type: Date,required:true},
	lastModified:{type: Date,default:Date.now},
	author:{type: String, required:true},
	questionYear:{type:Date,defaults: Date.now},
	popularity:{type:Number, max: 100, min:1,defaults: 50}
});

//User statistics
var userStatistics_schema = new mongoose.Schema({
	totalAnsweredIncorrect: {type:Number},
	totalAnsweredCorrect: {type:Number},
	avgTimeSpent: {type:Number},
	totalUsersVisited:{type:Number}
});

//Top level Parent Schema
// Overall
var question_schema = new mongoose.Schema({
	question: question_schema_sub,
	reported: reported_schema,
	meta: meta_schema,
	userStatistics: userStatistics_schema,
	universalId:{type: String}
});

//THE MODEL!!!
//var question_model = mongoose.model("question",question_schema);

module.exports = question_schema;