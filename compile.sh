echo "**********************Building****************************"
npm run build
echo "**********************Generating the binary of compilation function****************************"
sudo npm run langium:generate
echo "**********************Compilation Result****************************"
node ./bin/cli.js compile program.rob





# let void square(){
#     Forward 30 cm
#     Clock 90
#     Forward 300 mm
#     Clock 90
#     Forward 30 cm
#     Clock 90
#     Forward 300 mm
#     Clock 90
# }

##challences:
#la circularité dans le parcours de l'arbre syntaxique : 3 heure de recherche à cause des sous typage : le code tourne en round
#la comprehension du pattern : 2h visiteur
#le parcours de l'arbre : 1h 
#la traduction de certaines instructions : lecture du code robotexemple
