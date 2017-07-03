"use strict";
//Requires
const express = require("express");
const router = express.Router();
const validator = require("validator");
const apiConfig = require("./apiConfig.js");


// Use this instead of json.parse!!!!!!!!
var jsonsafeparse = require('json-safe-parse');


/*


Note to self: redesign this code it is bad;

~ also use lodash ---> it can check if two objects look similar!!! 



*/


//error handleing
var res_err = function (res,msg){
	var err = json.stringify({error:msg});
	res.status(500);
	res.send(err);
}

/*

	Outline for functions in order....
  
  
  recieve
  extract
  (sanitize???? how?)
  validate
  authenticate
  formulate-search
  query-search-params
  encode
  send


*/

//EXTRACT~extract the body and token ~~ ignore rest
 var extract  = function(req,res,callback){
	
	//recieve the body data
	var body = [];
	req.on('data',function(chunk){
		body.push(chunk);
	}).on('end',function(){
		
		//text body data ~ still in json format
		
		body = Buffer.concat(body).toString();
		

		var bodyParsed = JSON.parse(body);
		
		// not necessarily defined
		var auth = req.get("Authentication");
		
		callback(bodyParsed,res,auth);

	});
}
 
//VALIDATE~ make sure it is json
 var validate = function(body,res,auth,callback){
	 if(!(validator.isJson(body))){
		callback(body,res,auth,true);
	 } else if(auth && !(validator.isAscii(auth)){
		callback(body,res,auth,false);	   
	 }else{
		 callback(body,res,auth,true);
	 }
 }
 
 //AUTHENTICATE~check if token allows extra privledges
 var authenticate = function(body,res,auth,callback){
	 //This is where you would determine if the token ~ which may be in the auth variable is valid...
	 if(!auth){
		 callback(body,res,false);
	 }else{
		 
		 /// This is where determine if admin...= authorized..
		 callback(body,res,false);
	 }
 }
 
 //FORMULATE~ create a query to match the requests parameters
 var formulate = function(body,res,auth,callback){
	 
	 var queryParams = {
		 quantity:40,
		 tags:[],
		 level: 3,
		 avgDifficulty: 5,
		 avgSize: 2
	 };
	 try{
		 // Quantity
		 var valid = validator.isInt(str(body.quantity));
		 if(auth  && valid){
			 queryParams.quantity = parseInt(body.quantity);
		 }else if(valid){
			 var desiredQuant = parseInt(body.quantity);
			 var allowedQuant = desiredQuant <= 40 ? desiredQuant : 40;
			 queryParams.quantity = allowedQuant ;
		 }else{
			 throw new Error("Quantity: invalid property expected an integer");
		 }
		 
		 // Tags
		 if(body.tags instanceof Array){
			 function listValid(mlst){
				 for(var i=; i< mlst.lenght; i++){
					 if(!(validator.isAscii(mlst[i]))){
						 throw new Error(`Tags: invalid list item at index ${i} ASCII characters only`);
					 }
				 }
			 }
			 
			 // test if valid
			 listValid(body.tags);
			 
			 if(auth){
				 queryParams.tags = body.tags;
			 }else if( body.tags.length > 50){
				 throw new Error("Tags: Too many items in the list, maximum allowed without authentication is 50!!!");
			 }else{
				 queryParams.tags = body.tags;
			 }
			 
			//level
			if(!validator.isInt(str(body.level))){
				throw new Error("Level: Invalid Property expected a integer");
			}else if(!(0<=body.level<=5)){
				throw new Error("Level: Invalid Property value: must be in range 0-5 inclusive");
			}else{
				queryParams.level = body.level;
			}
			 
			 //avg Difficulty
			 if(body.avgDifficulty && (validator.isInt(str(body.avgDifficulty)) && (!(0<= body.avgDifficulty<=10)))){
				 queryParams.avgDifficulty = body.avgDifficulty;
			 }else if(!body.avgDifficulty){
					  //do nothing
			 }else{
				 throw new Error("avgDifficulty: invalid property insure it is a integer in the range 1-10 inclusive");
			 }
			 
		 }else{ 
			 throw new Error("Tags: invalid property expected an array or list");
		 }
		 
		 // avg Size
		 
	 }catch(e){
		 res_err(res,e.message);
	 }
	 
 }
 
 //QUERY~ actually run the query and get the data
 var query = function(){
	 // Shoot... we do not want to run check and query every question...
	 // having avg difficulty makes the query tricky...
	 
 }
 
 //ENCODE~ put this data as json
var encode = function (data,res,callback){
	var encoded = JSON.stringify(data);
	callback(encoded,res);
}

//SEND~the api response to the user
var send  = function(data,res){
	res.status(200);
	res.send(data);
}

//RECIEVE
router.post(apiConfig.generateRoute,(request,response)=>{
	//EXTRACT
	extract(request,response,(body,res,auth)=>{
		//VALIDATE
		validate(body,res,auth,(nbody,nres,nauth,err)=>{
			if(err){
				res_err(nres,"Server Error~ Unable to validate and parse Json API Request");
			}else{
				//AUTHENTICATE
				authenticate(nbody,nres,nauth,(body,res,isauth)=>{
					//FORMULATE
					formulate(body,res,isauth,(query,res)=>{
						//QUERY
/*  CALLBACK HELL */	query(query,res,(data,res)=>{
							//ENCODE & SEND 
							encode(data,send);
						});
					});
					
				});
			}
		});
	});
});

//Make it avilable
module.exports = router;