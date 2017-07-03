module.exports = function (req,res){
	
	// A simple test! (note res must be in json!!!)
	var text = "I am the generator Hi, I don't do much right now";
	var jsonText = JSON.stringify(text);
	res.send(jsonText);
	
	
}
