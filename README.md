# Certamen 
A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress

## Environment Requirements:
* Node Js
* Dependancies (see package.json)
* Run the command ```npm run setup ``` in terminal to install the dependancies 

## Devlopment tips
* Running ``` npm run server ``` in terminal starts a local server at http://localhost:8081 which hosts the './webRoot' folder
* The 'webRoot' folder will be treated as the server root folder... program links accordingly  
* Running the ```gulp``` command will build the site (you must run the command to see the changes you made in the ./dev folder, implemented!)

## Working with links
* Relative links will need a lot of work if they are going to work withine wordpress as shortcode
* './webRoot' is the hosted root dir

## Directory Structure
* Besides ./dev and ./webRoot differeng in name their file structure is the same
* NOTE: all .css .scss .js .jsx .pug/.jade .html will be minified and their file suffix will become for example: ' exampleFileName.min.html '
* Some file-type files will be concatanated... refer to the comments in the ./gulpfile.js for more information concerning this...

## Site Admin Email
* jcl.chancellors@gmail.com
* It may take some time to be contacted back
