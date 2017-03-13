# Certamen
A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress

## Environment Requirements:
* Node Js
* Dependancies (see package.json)
* Run the command ```npm run setup ``` in terminal to install the dependancies 

## Devlopment tips
* Running ``` npm run server ``` in terminal starts a local server at http://localhost:8081
* It Currently does not go to the index.min.html by default so here is the path http://localhost:8081/markup/index.min.html
* DO NOT FORGET to run ```gulp``` in terminal before you start work on the project... it will update the www which the server hosts!

## Working with links
* Relative links will need a lot of work if they are going to work withine wordpress as shortcode... see comments in shortcode.php
* All Production scripts,assets,etc... will be made avilable via the folder "www"

## Directory Structure
* All jsx,scss,png,jpeg,gif,svg files will be made avilable via the followining directories for production names
1. www/assets        For .png .jpeg .gif .svg and (anything else) -> implementation needs testing!!!!!
2. www/javascript    For .js .min.js
3. www/stylesheets   For .css .min.css
4. www/markup        For .html .min.html 
* The Gulpfile is configured to fit all files from /dev into these categories. Any jsx in /dev/components will be put in /www/javascript
* The other files their respective directory according to the guide above
* Please feel free to improve the gulp configuration :)

## Site Admin Email
* jcl.chancellors@gmail.com
