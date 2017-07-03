// 3rd Party Requires
const path = require("path");
const express = require("express");

//Api Routes
const chancellorApi = require("./chancellorApi/chancellorApi-server.js");


//Settings and Configuration
const settings = {
    serveDir:"/www",
    servePort: process.argv[2] || 8086
};

//Setup the app
var app = express();
app.set('port', settings.servePort);

//Generate Route for the chancellorApi.generate();
app.use(chancellorApi.path,chancellorApi.router);

//The regular static file serving
app.use(express.static(path.join(__dirname, settings.serveDir)));


//Listen for requests
var serverdev = app.listen(app.get('port'), function() {
  var port = serverdev.address().port;
  console.log('[Dev Server] listening on '+ port);
  console.log("[Dev Server] dont forget to run 'gulp' so the files auto update :)");
});