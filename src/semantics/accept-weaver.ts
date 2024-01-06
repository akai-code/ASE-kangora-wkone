import type { ValidationAcceptor, ValidationChecks } from 'langium';
import * as InterfaceAST from '../language/generated/ast.js';
//import * as ClassAST from './visitor.js';
//import { RoboMLVisitor } from './visitor.js';
import type { RobbotMlServices } from '../language/robbot-ml-module.js';

export function weaveAcceptMethods(services: RobbotMlServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new RobbotMlAcceptWeaver();
    registry.register(weaver.checks, weaver);
}

export class RobbotMlAcceptWeaver {
    weaveProgram(node: InterfaceAST.Program, accept: ValidationAcceptor): void {
        // Check if the program contains a function named 'entry'
        const entryFunction = node.functions.find(f => f.name === 'entry');
        if (!entryFunction) {
            accept('error', 'Program must contain function entry', { node, property: 'functions' });
        }
        // Check if there is at least one function in the program
        if (node.functions.length === 0) {
            accept('warning', 'Program has no functions', { node, property: 'functions' });
        }
        // Check if the program contains unique names for each function
        const functionNames = new Set<string>();
        for (const func of node.functions) {
            if (func.name && functionNames.has(func.name)) {
                accept('error', `Function name ${func.name} is not unique`, { node, property: 'functions' });
            } else {
                if (func.name) {
                    functionNames.add(func.name);
                }
            }
        }
    }
    weaveFunctionML(node: InterfaceAST.FunctionML, accept: ValidationAcceptor): void {
        // Check if the function name is unique
        const functionNames = new Set<string>();
        if (node.name) {
            if (functionNames.has(node.name)) {
                accept('error', `Function name ${node.name} is not unique`, { node, property: 'name' });
            } else {
                functionNames.add(node.name);
            }
        }
        // Check if parameter names are unique
        const parameterNames = new Set<string>();
        for (const param of node.parameters) {
            if (param.name && parameterNames.has(param.name)) {
                accept('error', `Parameter name ${param.name} is not unique`, { node, property: 'parameters' });
            } else {
                if (param.name) {
                    parameterNames.add(param.name);
                }
            }
        }
    }
    weaveParameter(node: InterfaceAST.Parameter, accept: ValidationAcceptor): void {
        // Check if parameter type is valid
        if (node.type !== 'number' && node.type !== 'void' && node.type !== 'bool') {
            accept('error', `Parameter type ${node.type} is not valid`, { node, property: 'type' });
        }
    }

    checks: ValidationChecks<InterfaceAST.RobbotMlAstType> = {
        Program: this.weaveProgram,
        FunctionML: this.weaveFunctionML,
        Parameter: this.weaveParameter
        // Add more weaving functions for other concepts as needed...
    };
}
