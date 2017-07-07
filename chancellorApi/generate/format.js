"use strict";

const mkError = require("./error_helper.js");
const _ = require("lodash");

module.exports = function(data_collection,callback){
	//limit what the user can get
	//console.log(data_collection);
	function remove_sensative(data_item){
		//console.log("+================================== Before ======================+")
		//console.log(data_item);
		//Data
		var filtered_data = {};

		//QUESTION: Only keep these properties	
		var question_pick = ["mainQuestion","additionalPrompt","helps","answerChoices"];
		var f_question = _.pick(data_item.question,question_pick);
		filtered_data.question = f_question;

		//META: Only keep these properties	
		var meta_pick = ["difficulty","tags","latinLevel","size","entryDate","lastModified","questionYear"];
		var f_meta = _.pick(data_item.meta,meta_pick);
		filtered_data.meta = f_meta;

		//_id : this is the unique mongo id
		var f__id = _.pick(data_item,["_id"]);
		filtered_data._id = f__id._id;
		
		//TimeStamp:
		var timestamp = new Date();
		filtered_data._timestamp = timestamp;
		//console.log("+================================== AFTER ======================+");
		//console.log(filtered_data);
		return filtered_data;
	}

	try{
		//storage
		var formatted_data = [];
		
		//Format all items in list
		for(var k=0; k<data_collection.length; k++){
			
			//current item
			var current_item = data_collection[k];
			//limit on each item
			var current_rem = remove_sensative(current_item);
			
			formatted_data.push(current_rem);
		}
		
		callback(null,formatted_data);
	}catch(e){
		var err = mkError("Unable to format response: "+ e);
		callback(err);
	}
	
}