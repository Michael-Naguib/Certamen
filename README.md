# Certamen
A app for (latin -jeopardy) Certamen for the site chancellorjcl.noip.me (link may change) that will be a work in progress

## Environment Requirements:
* Node Js
* Dependancies (see package.json)
* Run the command ```npm run setup ``` in terminal to install the dependancies 

## Working with links
* Relative links will need a lot of work if they are going to work withine wordpress as shortcode... see comments in shortcode.php
* All Production scripts,assets,etc... will be made avilable via the folder "www"

## Directory Structure
* All jsx,scss,png,jpeg,gif,svg files will be made avilable via the followining directories for production names
1. www/assets        For .png .jpeg .gif .svg and (anything else) -> needs implementation!!!!!
2. www/javascript    For .js .min.js
3. www/stylesheets   For .css .min.css
4. www/markup        For .html .min.html 
* The Gulpfile is configured to fit all files from /dev into these categories. Any jsx in /dev/components will be put in /www/javascript
* The other files their respective directory according to the guide above
* Please feel free to improve the gulp configuration :)

## Site Admin Email
* jcl.chancellors@gmail.com