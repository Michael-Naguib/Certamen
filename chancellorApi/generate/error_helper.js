"use strict";

module.exports = function(message,stopjsonify){
	var finishedMessage = "[chancellorApi-server] " + message
	console.log("[chancellorApi-server] ERR : " + message);
	if(!stopjsonify){
		return JSON.stringify({error: finishedMessage});
	}
	
	return finishedMessage;
}