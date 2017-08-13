"use strict";
const mongoose = require('mongoose');

var user_schema = new mongoose.Schema({
	username:{type:String,required:true,maxlength:50},
	passwordHash:{type:String,required:true},
	salt:{type:String,required:true},
	email:{type:String,required:true}
});

module.exports = user_schema;