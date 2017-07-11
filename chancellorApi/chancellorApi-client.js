var chancellorApi = function(){
	/*
		# Api Documentation is spread via each class method for itselfe.... will need to be merged
	*/
	//Api Entry Path ~ needs implementation
	this.__apiEntry = "/chancellorApi";

	//Routes for the individual api methods
	this.__routes = {
		authRoute:"/authenticate/",
		generateRoute:"/generate/",
		checkRoute:"/check/",
		reportRoute:"/report/",
		addRoute:"/add/",
		removeRoute:"/remove/",
		modifyRoute:"/modify/",
		queryRoute:"/query/",
		newUser:"/newUser"
	};

	//chancellorApi.authenticate will only work, if a secure connection is established, when this is set to true
	this.__auth_only_https = true;

	//Tokens will only work, if a secure connection is established, when this is set to true
	this.__token_only_https = true;

	//EXAMPLE OPTIONS gen
	this.example = {};
	//example for the gen api:
	this.example.generate =  {
		quantity: 40,
		tags:["foo","bar","baz","jason","cicero"],
		level: 4,
		avgDifficulty: 2.5,
		avgSize: 2
	}
	//example for the check api:
	this.example.check = {
		_ids = [
			{_id:"595ede7ca5e5222a78aad0bd",answer:"d"},// the correct one is c
			{_id:"595ff7747ee5420eacea75e1",answer:"b"}
		]
	}
	//Example but WORKING CREDENTIALS
	this.example.password= "password";
	this.example.username="admin";

	//Example for the newUser:
	this.example.newUser = {
		newUser:{
			username:"admin",
			password:"password",
			email:"emailNameExample@example.com"
		}
	}
}

//=== Api Core ===

//Error handling
chancellorApi.prototype.__Error = function (errText,stop){
	var err = new Error("[chancellorApi] " + errText);

	if(stop){
		throw err;
	}

	return err;
}

//Warn handling
chancellorApi.prototype.__Warn = function (warnText){
	console.warn("[chancellorApi] " + warnText);
}

//handle the requests to and from the server... decode and all
chancellorApi.prototype.__make_request = function(data,path,callback,token){
	//merge to api root
	path = this.__apiEntry + path;
	//make sure args are provided
	//if(!(options && callback){
	//	this.__Error(" the api method expected required aguments: options and a callback")
	//}

	//catch any other errors ~~~ this will need work to catch errs since async
	try{
		/*
		callback takes two args response,error
		Make sure to explicitly bind the context of 'this' when using object oriented programming....    func.bind(this);
		*/

		//request
		var req = new XMLHttpRequest();

		//Error handling for req.onreadystatechange function via explicit binding
		var expBound__Error = this.__Error.bind(this);

		//set the handler for the response
		req.onreadystatechange = function(){

			try{
				//check if done
				if(req.readyState === 4){
					if(! (200> req.status >=300)){
						// check if status is not a 2xx code... pass error
						callback(req.status, JSON.parse(req.responseText));
					}else if(200<=req.status<300){
						// check if status is a 2xx code
						callback(false,JSON.parse(req.responseText));
					}

				}
			} catch(e){
				callback(expBound__Error(e.message),undefined);
			}

		}

		//open the connection
		req.open("POST",path);

		//set the headers
		req.setRequestHeader('Content-type','application/json; charset=utf-8');

		//token is an optional argument
		if(token){
			req.setRequestHeader("Authorization",token);
		}

		//HARDCODE CREDENTIALS --> REMOVE LATER --!!! README
		data.username= this.example.username;
		data.password= this.example.password;
		//send the data as json;
		req.send(JSON.stringify(data));

	}catch(e){

		//callback with the error
		callback(this.__Error(e.message),undefined);
	}
}

//Allows for the exchange to get a token
chancellorApi.prototype.authenticate = function(signInInfo,callback){
	this.__make_request(signInInfo,this.__routes.authRoute,callback,false);
}


//=== Not Require Token ===

//Generate a list of questions
chancellorApi.prototype.generate = function(options,usercallback,token){

	/*

		## class method ```.generate(options,callback,token);```
		* allows the user to retrieve generated test from the server in json format;

		### argument ``` options ```
		* This is an ```Object``` specifying question generation information
		* ```options.quantity```[required]  is the number of questions to be given. Note! unless a authentication JWT token is specified the maximum allowed value for this property is ``` 40 ```
		* ``` options.tags```[required]  is a list of the tags that the question database will consider when picking questions.... maximum allowed number of tags without specifing a valid JWT token is ```50```
		* ```options.level```[required] refers to Latin Level such as Latin III, IV, etc... valid values; the levels are maped to numbers as such is their index in this list ```['I','II','III','III Prose','IV','IV Poetry'] ``` so for example say you want to set the latin level to latin III : ``` options.level =  2;```
		* ``` options.avgDifficulty``` [optional] Difficulty of a question is rated on a scale of 1-10, 10 being harder... the server can try to generate a test with an average difficulty of the specified value.
		* ``` options.avgSize``` [optional] questions are either Small,Medium,or Large, the api will try to generate a list of questions that fit this criteria, so for example if you want the questions to average medium-large then ```options.avgSize = 2.5```; Valid values for this property range from 1-3 inclusive
		* the options argument should look like the following for example:
		```
			var options = {
				quantity: 40,
				tags:["foo","bar","baz"],
				level: 4,
				avgDifficulty: 2.5,
				avgSize: 2
			}
		```
		### argument ```callback```
		* This is a ```function``` taking two arguments ``` error```  and  ``` response```
		* If this is a method do not forget to explicitly bind it's context using ES6 ``` func.bind(this)```

		### argument ```token``` [optional]
		* This is not required for question generation, However!, this removes some restrictions on the generation process; see the doumentation above concerning argument ``` options```


	*/


	//Request the generate questions Route: does not require a token
	this.__make_request(options,this.__routes.generateRoute,usercallback,token);
}

//Check to see if the supplied answer-question combo is correct
chancellorApi.prototype.check = function(values,usercallback,token){
	this.__make_request(values,this.__routes.checkRoute,usercallback,token);
}

//Add a new user
chancellorApi.prototype.newUser = function(options,usercallback,token){
	this.__make_request(options,this.__routes.newUser,token);
}

//Report a question/s for being bad... etc..
chancellorApi.prototype.report = function(values,usercallback,token){
	this.__make_request(values,this.__routes.reportRoute,usercallback,token);
}


//=== Requires A Token ===

//Add these to the database
chancellorApi.prototype.add = function(data,usercallback,token){

	//This api method requires a token
	if(!token){
		this.__Warn(" The api method .add() REQUIRES an authentication token! Nothing will be added");
	}

	//Send the data to the server and route it
	this.__make_request(data,this.__routes.addRoute,usercallback,token)
}

//Remove these from the database
chancellorApi.prototype.remove = function(data,usercallback,token){

	//This api method requires a token
	if(!token){
		this.__Warn(" The api method .remove() REQUIRES an authentication token! Nothing will be removed");
	}

	//Send the data to the server and route it
	this.__make_request(data,this.__routes.removeRoute,usercallback,token)
}

//Modify these items in database
chancellorApi.prototype.modify = function(data,usercallback,token){

	//This api method requires a token
	if(!token){
		this.__Warn(" The api method .modify() REQUIRES an authentication token! Nothing will be modified");
	}

	//Send the data to the server and route it
	this.__make_request(data,this.__routes.modifyRoute,usercallback,token)
}

//Query for these
chancellorApi.prototype.query = function(data,usercallback,token){

	//This api method requires a token
	if(!token){
		this.__Warn(" The api method .query() REQUIRES an authentication token! Nothing will be queried");
	}

	//Send the data to the server and route it
	this.__make_request(data,this.__routes.queryRoute,usercallback,token)
}
