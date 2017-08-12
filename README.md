# Certamen
A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress

## Server
* currently being configured... gulp + webpack scripts still need a bit of work to transpile move files etc...
* A bit of the below info is outdated but valid... the build is more automated

## Quick & Easy TL;DR;
* `npm install`
* `nodemon server.js -m -a` Unless the php is done or you also host a mongo server on your pc this will prevent setting up a connection
* Set the slack webhook in ./chancellorApi/general/error_helper.js .... do not push the text to the repo... get the hook from withine the slack msg made for this project

## Environment Requirements:
* Node Js
* Dependancies (see package.json)
* Run the command ```npm run setup ``` in terminal to install the dependancies

## Devlopment tips
* Running ``` npm run server ``` in terminal starts a local server at http://localhost:8081
* An index.php file in "www" redirects to markup/index.min.html.
* "www" is treated as the root directory.
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
* The Gulpfile is configured to fit all files from /dev into these categories.
* The other files their respective directory according to the guide above
* Please feel free to improve the gulp configuration :)

## Site Admin Email
* jcl.chancellors@gmail.com
* It may take some time to be contacted back
