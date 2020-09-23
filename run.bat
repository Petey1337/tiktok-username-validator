@echo off
IF EXIST node_modules (
goto start
) else (
npm install
)
:start
node index.js
pause