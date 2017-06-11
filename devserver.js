//Requires
const path = require("path");
const express = require("express");

//Settings and Configuration
var app = express();

//Get user Command line input
const settings = {
    serveDir: process.argv[3] || "./webRoot",
    servePort: process.argv[2] || 8086,
    index: "index.min.html"
};


//Main Code

app.set('port', settings.servePort);
app.use(express.static(path.join(__dirname, settings.serveDir)));

// Listen for requests
var devserver = app.listen(app.get('port'), function() {
    var port = devserver.address().port;
    console.log("[Server] be sure to build the site so that code changes are reflected in the code");
    console.log('[Server] listening on '+ port + " hosting the directory: " + settings.serveDir);
    console.log("[Server] The default served document from the root folder is: " + settings.index);
});