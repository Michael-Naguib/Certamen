"use strict";
const mkError = require("../generate/error_helper.js");

//Authentication Fail...
const AuthFail = (req,res)=>{
	res.status(401);
	var error_msg =  mkError("You are not authorized to access this");
	res.send(error_msg);
}

module.exports = AuthFail;