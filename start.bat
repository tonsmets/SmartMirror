@ECHO off
set DatabasePath="%~dp0/data"

start "SmartMirror" cmd /k grunt
mongod.exe --dbpath %DatabasePath%