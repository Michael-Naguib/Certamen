//Requires
const path = require("path");
const express = require("express");

//Settings and Configuration
var app = express();

const settings = {
    serveDir:"www",
    servePort: process.argv[2] || 8080
};


//Main Code

app.set('port', settings.servePort);
app.use(express.static(path.join(__dirname, settings.serveDir)));

// Listen for requests
var serverdev = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('[Dev Server] listening on '+ port);
});