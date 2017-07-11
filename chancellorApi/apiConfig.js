//Settings
var settings = {};

//Api Entry Path:
settings["apiEntry"] = "/chancellorApi";

//Error Notification/logging:
const error = {
	notifyAdminOnFatal: true,
	admins:['soccer72msn2@gmail.com']
}
settings["error"] = error;

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
	unauthorized:'/unauthorized',
	newUser:"/newUser/"
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
