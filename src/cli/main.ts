//importation for working function
import { extractAstNode} from './cli-util.js';
//import chalk from 'chalk';
import { createRobbotMlServices } from '../language/robbot-ml-module.js';
import { NodeFileSystem } from 'langium/node';
/***************************** */


//don't touch
import { Command } from 'commander';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Program } from '../semantics/visitor.js';
import { ConcreteVisite } from '../semantics/compiler.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packagePath = path.resolve(__dirname, '..', '..', 'package.json');
const packageContent = await fs.readFile(packagePath, 'utf-8');
// don't touch

//
export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    // const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    // const model = await extractAstNode<Model>(fileName, services);
    // const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    // console.log(chalk.green(JavaScript code generated successfully: ${generatedFilePath}));
    // console.log("********je suisk*******");
     // retrieve the services for our language

    //  const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
     // extract a document for our program
    //  const document = await extractDocument(fileName, services);
     // extract the parse result details
    //  const parseResult = document.parseResult;
    // console.log("**** Je suis ******")
    console.log("le log s'affiche");
    console.log(fileName);
};



//Fonction that parseAndCompile the robotMLcode code to c arduino code
export const parseAndCompile = async (fileName: string): Promise<void> => {

    const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    const ast = await extractAstNode<Program>("program.rob",services) ;
    const visite = new ConcreteVisite() ;
    let compilation_result = ast.accept(visite);
    //
    writeInFile("./CompilationOutput/compiled_robot_code",compilation_result) ;
};


//
export function writeInFile(path : string,content:string){

    // const fs = require('fs');

    // Écrivez la chaîne de caractères dans le fichier
    fs.writeFile(path, content) ;
}


//
export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program.version(JSON.parse(packageContent).version);

    //const fileExtensions = RobbotMlLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        //.argument('<file>', source file (possible file extensions: ${fileExtensions}))
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);
    
    program
        .command('compile')
        //.argument('<file>', source file (possible file extensions: ${fileExtensions}))
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('compile the code to arduino code')
        .action(parseAndCompile);

    program.parse(process.argv);
}