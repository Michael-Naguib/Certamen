@echo off
echo Give 20 secconds for the mongo database to boot before launching the devserver.js
timeout /t 20
node devserver.js