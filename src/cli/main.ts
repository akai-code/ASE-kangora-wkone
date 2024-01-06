import { Program } from '../semantics/visitor.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { RobbotMlLanguageMetaData } from '../language/generated/module.js';
import { createRobbotMlServices } from '../language/robbot-ml-module.js';
import { extractAstNode, extractDocument } from './cli-util.js';
import { NodeFileSystem } from 'langium/node';
import { RoboMLInterpreter } from '../semantics/interpreter.js';


export const generateAction = async (fileName: string): Promise<void> => {
    console.log(chalk.green(`Generating code from ${fileName}`));
    const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    const model = await extractAstNode<Program>(fileName, services);
    const rob = new RoboMLInterpreter();
    rob.interpret(model);
    console.log(chalk.green(`Successfully generated code from ${fileName}`));
};

export const parseAndValidate = async (fileName: string): Promise<void> => {
    console.log(chalk.green(`Parsing & validating ${fileName}`));
    const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    const document = await extractDocument(fileName, services);
    console.log(chalk.green(`Successfully parsed & validated ${document.uri}`));
};

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version("0.0.1");

    const fileExtensions = RobbotMlLanguageMetaData.fileExtensions.map(e => `.${e}`).join(', ');
    program
        .command('parse <file>')
        .description(`Parse and validate a RobbotML file. Supported file extensions: ${fileExtensions}`)
        .action(parseAndValidate);

    program
        .command('generate <file>')
        .description(`Generate code from a RobbotML file. Supported file extensions: ${fileExtensions}`)
        .action(generateAction);

    program.parse(process.argv);
}