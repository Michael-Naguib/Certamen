//Requires
const path = require("path");
const express = require("express");
const router = express.Router();
var gen = function (req,res){
	res.send(JSON.stringify({msg:'This is where the generated questions would go!!! this is quite dynamic', requesthead:req.headers }));
};


//Settings and Configuration
var app = express();

const settings = {
    serveDir:"/www",
    servePort: process.argv[2] || 8086
};


//Main Code

app.set('port', settings.servePort);
app.use("/chancellorApi",router);
app.use(express.static(path.join(__dirname, settings.serveDir)));
//app.get('/',gen);
router.post('/generate/',gen);

//app.get('/chancellorApi/generate/',gen);
// Listen for requests
var serverdev = app.listen(app.get('port'), function() {
  var port = serverdev.address().port;
  console.log('[Dev Server] listening on '+ port);
  console.log("[Dev Server] dont forget to run 'gulp' so the files auto update :)");
});