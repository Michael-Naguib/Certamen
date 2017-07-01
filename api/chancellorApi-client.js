var chancellorApi = function(){
	/*
		# Api Documentation is spread via each class method for itselfe.... will need to be merged
	*/
	
	// internal api settings to accomodate changes
	this.__settings = {
		generateRoute:"/chancellorApi/generate/",
		checkRoute:"/chancellorApi/",
		addRoute:"/chancellorApi/",
		removeRoute:"/chancellorApi/",
		modifyRoute:"/chancellorApi/",
		queryRoute:"/chancellorApi/",
		authRoute:"/chancellorApi/",
	};
}


//allow for error handeling
chancellorApi.prototype.__Error = function (errText){
	throw new Error("[chancellorApi] " + errText);
}

//handle the requests to and from the server... decode and all
chancellorApi.prototype.__make_request = function(data,path,callback,token){
	
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

		//set the handler for the response
		req.onreadystatechange = function(){
			//check if done
			if(req.readyState === 4){
				if(! (200> req.status >=300)){
					// check if status is not a 2xx code... pass error
					callback(JSON.parse(req.responseText),req.status);
				}else if(200<=req.status<300){
					// check if status is a 2xx code
					callback(JSON.parse(req.responseText),false);
				}

			}
		}

		//open the connection
		req.open("post",path);

		//set the headers
		req.setRequestHeader('Content-type','application/json; charset=utf-8');

		//token is an optional argument
		if(token){
			req.setRequestHeader("Authorization",token);
		}

		//send the data as json;
		req.send(JSON.stringify(data));
	}catch(e){
		this.__Error(e.message);
	}
}

//specify job b a specific route path
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
				avgDifficulty: 2.5
				avgSize: 2
			}
		```
		### argument ```callback``` 
		* This is a ```function``` taking two arguments ``` response``` and ``` error```
		* If this is a method do not forget to explicitly bind it's context using ES6 ``` func.bind(this)```
		
		### argument ```token``` [optional] 
		* This is not required for question generation, However!, this removes some restrictions on the generation process; see the doumentation above concerning argument ``` options```
		
	
	*/
	
	
	//Request the generate questions Route: does not require a token
	this.__make_request(options,this.__settings.generateRoute,usercallback,token);
}

//api check answer vs question id or some other options data specified
chancellorApi.prototype.check = function(values,usercallback){
	this.__make_request(values,this.__settings.checkRoute,usercallback,false);
}