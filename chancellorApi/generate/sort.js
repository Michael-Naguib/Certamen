"use strict";
const mkError = require("./error_helper.js");
/*
	Sorting Algorithim:
		latin level is most important
		tags come seccond
		
		avgDifficulty third //stocastic best fit algorithim
		avgSize fourth		//stocastic best fit algorithim
		
		take the top 40 that have the most points
		
		or the top N=quantity that have the most points
		
	A function will rank a question based upon the above criteria and:
		lastModified
		reportedIncorrect
		reportedMistake
		reportedInappropriate
		popuarity meta
		
		
*/

function Algorithim(criteria){
		this.__criteria = criteria;// the user desired
		// can be accessed by the ranking algorithim at any time
		this.__total_Ranked = 0;
		this.__total_Difficulty = 0;
		this.__total_size = 0;
		
		//weights for the properties + or - !!!!!
		this.__weights = {
			level: 1,
			tagsQuantityMatched:1,
			lastModified:1,
			reportedIncorrect:0-1,
			reportedMistake:0-1,
			reportedInappropriate:0-1,
			
		}
	
		this.squash = function(x){
			return 1/(1+ Math.exp(0-x));
		};
}

Algorithim.prototype.__compare = function(listOne,listTwo){
	var common = 0;
	
	var lo,lt;
	
	if(listOne.length >= listTwo){
		lo = listTwo;
		lt = listOne;
	}else{
		lo = listOne;
		lt = listTwo;
	}
	
	for(var i=0; i<lo.length;i++){
		for(var j=0; j<lt.length; j++){
			if(lo[i]===lt[j]){
				common +=1;
			}else{
				continue;
			}
		}
	}
	
	return common;
};

Algorithim.prototype.__rankIndividual = function(doc){
	
	
	let points = 10;
	
	//latinlevel:
	points += this.__weights.level * this.squash(8 - Math.abs(doc.meta.latinLevel - this.__criteria.level));
	
	
	//how many similar tags?
	var matchedTags = this.__compare(this.__criteria.tags,doc.meta.tags);
	points += this.__weights.tagsQuantityMatched * this.squash(matchedTags);
	
	// reporting
	points += this.__weights.reportedInappropriate * 8 * this.squash( doc.reported.inappropriate);
	points += this.__weights.reportedMistake * 2 * this.squash( doc.reported.mistake);
	points += this.__weights.reportedInappropriate * 4 * this.squash( doc.reported.incorrect);
	
	//lastModified
	var itemDate = new Date(doc.meta.lastModified);
	itemDate = itemDate.getTime();
	var nowDate  = new Date();
	nowDate = nowDate.getTime();
	points += this.__weights.lastModified *100* this.squash(0-Math.abs(this.squash(itemDate) - this.squash(nowDate)));
	
	return points;
}

module.exports = function(results,data,callback){
	try{
		var judge = new Algorithim(data);
		var doc_store = [];
		results.on('error',(err)=>{
			callback(mkError("Unable to rank the results " + err));
		}).on('data',function(q_doc){
			
			doc_store.push([q_doc,judge.__rankIndividual(q_doc)]);
		}).on('close',()=>{
			var allPicked = [];
			var allSortedDescending = doc_store.sort(function(a, b){return b[1]-a[1]});
			
			//remove the points ranking
			for(var m=0;m<allSortedDescending.length;m++){
				//console.log(allSortedDescending[m][0]);
				allPicked.push(allSortedDescending[m][0]);
			}
			

			if(data.quantity>= allSortedDescending.length){
				
				//understand the logic
				allPicked = allPicked;
			}else{
				allPicked = allPicked.slice(0,data.quantity);
			}

			callback(null,allPicked);
		});
	}catch(e){
		callback(mkError("Unable to rank the results " + e));
	}

}