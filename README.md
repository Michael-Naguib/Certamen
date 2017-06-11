# Certamen 
* A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress
* This project is NOT associated with the business http://stmacademy.org/ ... only except as a JCL club with a site pending approval...

## Environment Requirements:
* Node Js
* Dependancies (see package.json)
* Run the command ```npm run setup ``` in terminal to install the dependancies 

## Areas that need Work:
* A suitable way to transpile react with dependancies!!!
* and maintain a workflow!
* Migrated to webpack

## Devlopment tips
* Running ``` node devserver.js ``` in terminal starts a local server at http://localhost:8085 which hosts the './webRoot' folder
* The 'webRoot' folder will be treated as the server root folder... program links accordingly  
* Running the ```gulp``` command will build the site (you must run the command to see the changes you made in the ./dev folder, implemented!)
* Running the ``` gulp js``` command is more resource intensive and may take some time!!!
* Link depandencies in any .jsx file in that file EXPLICITLY!!!! webpack does not gaurentee it in the global scope...
* You can include scripts via ``` import x from './y.js' ```

## Working with links
* Relative links will need a lot of work if they are going to work withine wordpress as shortcode
* './webRoot' is the hosted root dir unless otherwise specified as the seccond argument to devserver.js ``` node devserver.js 80 '/aDirOfYourChoice'```
* ./dev and ./webRoot are identical in structure so in ./dev you can make a relative link to "src/markup/extra.html" BUT KNOW THAT all scripts,stylings,and markup will change to have the suffix .min in the ./webRoot folder... for example the previous becomes "src/markup/extra.min.html"

## Directory Structure
* Besides ./dev and ./webRoot differeng in name their file structure is the same
* NOTE: all .css .scss .js .jsx .pug/.jade .html will be minified and their file suffix will become for example: ' exampleFileName.min.html '
* Some file-type files will be concatanated... refer to the comments in the ./gulpfile.js for more information concerning this...

## Site Admin Email
* jcl.chancellors@gmail.com
* It may take some time to be contacted back
