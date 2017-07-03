"use strict";

/*
	#chancellorApi-server
	*This manages all the backend server work for the api
	*using ```var capi = require("./chancellorApi/chancellorApi-server.js");``` an object is returned
	* The format for the object is as follows
	```
		capi = {
			router: ,// the backend routing stuff....
			path:    // the path for the entry into the api.... 
		}
		
	```
	* In your express app just do
	``` app.use(capi.path,capi.router);```

*/

//Requires
const express = require("express");
const router = express.Router();

//Api Settings
const apiConfig = require("./apiConfig.js");

//Route Handlers 
//const auth = require("./chancellorApi/authenticate/entry.js");

const gen = require("./generate/entry.js");
/*const chk = require("./chancellorApi/check/entry.js");
const rpt = require("./chancellorApi/report/entry.js");

const add = require("./chancellorApi/add/entry.js");
const rmv = require("./chancellorApi/remove/entry.js");
const mod = require("./chancellorApi/modify/entry.js");
const qry = require("./chancellorApi/query/entry.js");
*/

//Add the api paths
//router.post(apiConfig.routes.authRoute,auth);

router.post(apiConfig.routes.generateRoute,gen);
/*router.post(apiConfig.routes.checkRoute,chk);
router.post(apiConfig.routes.reportRoute,rpt);

router.post(apiConfig.routes.addRoute,add);
router.post(apiConfig.routes.removeRoute,rmv);
router.post(apiConfig.routes.modifyRoute,mod);
router.post(apiConfig.routes.queryRoute,qry)
*/
//Make it avilable
module.exports = {router:router,path: apiConfig.apiEntry};