//Settings
var settings = {};

//Api Entry Path: 
settings["apiEntry"] = "/chancellorApi";

//Routes
const routes = {
	authRoute:'/authenticate/',
	generateRoute:'/generate/',
	checkRoute:'/check/',
	reportRoute:'/report/',
	addRoute:'/add/',
	removeRoute:'/remove/',
	modifyRoute:'/modify/',
	queryRoute:'/query/',
};
settings["routes"] = routes;


//Database Settings~ worker access
const database={
	user:false,
	pass:false,
	db:"chancellorApi",
	port:27017,
	host:"localhost"
}
settings["database"] = database;

//export the settings
module.exports = settings;