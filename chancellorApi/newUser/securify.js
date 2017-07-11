"use strict";

const Hashes = require('jshashes');
var SHA1 = new Hashes.SHA1();
const mkError = require("../generate/error_helper.js");
const randomstring = require("randomstring");

module.exports= function(user,callback){
    try{
        //setup data...
        var schema_like_user = {};
        schema_like_user.username = user.username;
        schema_like_user.email = user.email;

        //generate a random salt
        schema_like_user.salt = randomstring.generate({length:6,charset:"alphabetic"});

        //compute the hash:
        let pass_and_salt = `${user.password}${schema_like_user.salt}`;
        var hashedPassword = SHA1.hex(pass_and_salt);

        //Store it in the object...
        schema_like_user.passwordHash = hashedPassword;
        //pass the data
        callback(null,schema_like_user);
    }catch(e){
        //Error
        callback(mkError("Securify Failed: "+ e));
    }

}
