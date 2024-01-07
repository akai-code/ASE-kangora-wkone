@echo off
echo "**********************Building****************************"
npm run build
echo "**********************Generating the binary of compilation function****************************"
npm run langium:generate
echo "**********************Compilation Result****************************"
node .\bin\cli.js interpret test.rob
