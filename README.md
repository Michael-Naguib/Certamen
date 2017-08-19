# Certamen Server
* A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress

## Quick & Easy TL;DR;
* ```npm install```
* ```npm install -g nodemon gulp gulp-cli express```
* ```nodemon server.js -m -a --dev -p 8080```

## Need Help?
* For help with the command line arguments do ```node server.js -h```
* Slack or G+hangouts msg me
* Read the docs below:

## What needs work done:
* gulp: more specifically creating the dynamically linked libs for deps in webpack
* Unifying all the sparse config options variables scatered throught files into ./config/default.json
* Entry point config for scripts

## Devlopment tips
* For starting the server use ```nodemon server.js -m -a --dev -p 8080``` (If a port is not specified it will use port 8086)
* The server will log Info to the console detailing the hosted dir,port, and db connection status
* Config for the server and other mongo-authentication stuff is in ```./config/default.json ``` (currently production.json is obselete)

### Mongo database
* Connection config can be found in ```./config/default.json ```
* Running the server with the -m arg will prevent a connection from being made to the database: (usefull if you dont have a database)

### php
* The server will be made to process php files.
* Currently php files may raise errors until a php  install is added into ./php
* The -a arg for server.js prevents php parsing!!!! will be served statically

### Directory Structure
* All jsx,scss,png,jpeg,gif,svg files will be made avilable via the followining directories for production names
1. www/assets        For .png .jpeg .gif .svg and anything else
2. www/javascript    For .js .min.js
3. www/stylesheets   For .css .min.css
4. www/markup        For .html .min.html
5. www/php           For .php .min.php

## Server Notifications:
* ./chancellorApi/generate/error_helper.js is a script designed to handle errors!
* It has the ability to email admins & post to the slack channel 'chancellorjcl' when a fatal error is detected
* Emails will be sent to the addresses listed in ```./config/default.json ```

### Slack
* SLACK will NOT work without setting the webhook! This is a sensative piece of text so it is not included in the repo (do not push it to the repo!!)
* This webhook string can be obtained by contacting me: or by checking slack team messaging history
* To set this goto ```./chancellorApi/generate/errro_helper.js ``` line 9 variable hook_url and set that to the hook text

### ./chancellorApi/generate/error_helper.js in Depth:
* This is an error notification module
* What it does: asigns who made the err, colors the text, notify admins
* usage is as follows:
* You may pass a optional 2nd argument to configure the options of the error making process
```
var options = {
    fatal: bool default false,
    notifyAdmins: bool default false unless fatal,
    returnAsText: bool defaults false --> returns json,
    location: string --> any clue as to where the error is from... will be added onto message,
    timestamp: bool defaults true
};
```
* Usage:
```const mkError=require("modulepathhere");
    try{
        // bad code that errors
        throw "I am a Bug";
    }catch(err){
        //Is passed as an optional argument: see options full explanation above
        var options = {fatal:true}

        //Modify the error msg
        errorText= mkError(err,options); //Notifications sent, text formatted etc...

        // Log it
        console.log(errText);

    }
```
## Gulp Processing
* (NOT WORKING) currently the gulp automation code is being overhauled
* This will build & optimize all the files in ./dev and move them into ./www
* Some files will be renamed... for example index.html --> index.min.html index.js --> index.min.js
* All Sass Files will be transpiled: index.sass --> index.min.css
* JSX files will be bundled with webpack: index.jsx --> index.bun.min.js
* If you do not want gulp to modify the file in any way you can place it in the ./dev/assets and it will be coppied into ./www/assets
* The server by default hosts ./www as root

### Mappings:
* .scss .sass   --> .min.css
* .js           --> .min.js
* .jsx          --> .bun.min.js
* .pug .html    --> .min.html
* .php          --> .min.php or .php ?? handeling php may prove difficult in gulp
* Anything else is served as is

## Front End Devlopment
* The backend has been set up by yours truely: Michael N. Aka Hedgehog... gulp has been configured very carefully...
* When writing filepaths the ```./www``` is the root of the server!!!!!
* The default gulp task watches for changes... if you are working on a certian folder subset running the specific gulp task for that folder may be faster
* To start active watching and compile when save run ```gulp ```
* This console will also output errors caught by linting or compilation or etc...
* Only files listed in the subfolders below will show up in the ./www ....
### Scripts ./dev/scripts/ Folder
* Webpack will compile minifyto each file that is a direct child of this Directory
* The files will be be given the extension .min  example: ``` hello.jsx --> hello.min.js ```
* ( watch out for name conflicts like test.js & test.jsx which resolve to the same filetype .js when compiled)
* Any file in ./dev/scripts/exclude will not be compiled by webpack as a entrypoint however can be used withine entrypoints
* The output for these files is: ```./www/scripts/```
* The specific sub gulp task for this folder is: ```gulp scripts ```
### Assets ./dev/assets/ Folder & Php ./dev/php/ Folder
* All Files in this directory will be coppied into ```./www/assets/ ``` and ```./www/php/ ``` respectivly and will not be modified in any way
* The specific sub gulp task for this folder is: ```gulp assets ``` and ```gulp php ``` respectivly
### Markup ./dev/markup/ Folder
* .pug Files will be compiled, then all html is taken and minified and linted
* All files will be given the .min extension in a similar manner files in scripts folder are given
* The specific sub gulp task for this folder is: ```gulp markup ```
### Stylesheets ./dev/stylesheets/ Folder
* .sass and .scss are both transpiled into their .css counterparts
* All files will be given the .min extension
* linting, autoprefixing(To make dev for IE easier), and minification are implemented
* Errors in syntax will be loged the command line
* The specific sub gulp task for this folder is: ```gulp stylesheets ```
### ./dev/buildStaging Folder
* Do not touch this is needed for webpack... in the future it will be used to implement SubIntegrityHashes 'SRI' for most files

## Site Admin Email
* jcl.chancellors@gmail.com
* It may take some time to be contacted back
