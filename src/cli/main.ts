import { extractAstNode} from './cli-util.js';
import { createRobbotMlServices } from '../language/robbot-ml-module.js';
import { NodeFileSystem } from 'langium/node';
import { Scene, BaseScene } from '../web/scene.js';



//don't touch
import { Command } from 'commander';
import * as url from 'node:url';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Program } from '../semantics/visitor.js';
import { interpreter } from '../semantics/interpreter.js';
//import { ConcreteVisite } from '../semantics/compiler.js';

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
    // console.log("***je suisk**");
     // retrieve the services for our language

    //  const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
     // extract a document for our program
    //  const document = await extractDocument(fileName, services);
     // extract the parse result details
    //  const parseResult = document.parseResult;
    // console.log("** Je suis **")
    console.log("le log s'affiche");
    console.log(fileName);
};



//
export const parseAndInterprete = async (fileName: string): Promise<void> => {

    const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    const ast = await extractAstNode<Program>("test.rob",services) ;
    console.log('AST ::::', ast);

    // Créez une instance de la scène
    const scene: Scene = new BaseScene();
    interpreter.interpret(ast, scene);
};



//// Methode de test ////

/**
 * Parse and validate a program written in our language.
 * Verifies that no lexer or parser errors occur.
 * Implicitly also checks for validation errors while extracting the document
 *
//  * @param fileName Program to validate
//  */
// export const parseAndValidate = async (fileName: string): Promise<void> => {
//     // retrieve the services for our language
//     const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
//     // extract a document for our program
//     const document = await extractDocument(fileName, services);
//     // extract the parse result details
//     const parseResult = document.parseResult;
//     // verify no lexer, parser, or general diagnostic errors show up
//     if (parseResult.lexerErrors.length === 0 && 
//         parseResult.parserErrors.length === 0
//     ) {
//         console.log(chalk.green(Parsed and validated ${fileName} successfully!));
//     } else {
//         console.log(chalk.red(Failed to parse and validate ${fileName}!));
//     }
// };

///  Methode de test ////




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
        .command('interpret')
        //.argument('<file>', source file (possible file extensions: ${fileExtensions}))
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('compile the code to arduino code')
        .action(parseAndInterprete);
    program.parse(process.argv);
}