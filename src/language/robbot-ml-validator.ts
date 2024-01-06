import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { Program, RobbotMlAstType, VariableDeclaration } from './generated/ast.js';
import type { RobbotMlServices } from './robbot-ml-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: RobbotMlServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.RobbotMlValidator;
    const checks: ValidationChecks<RobbotMlAstType> = {
        Program: [validator.checkNameFunctionIsUnique, validator.checkFunctionEntryIsPresent],
        VariableDeclaration: [validator.checkNameVariableIsUnique]
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class RobbotMlValidator {

    checkFunctionEntryIsPresent(node: Program, accept: ValidationAcceptor): void {
        // Rule: Presence de la fonction d'entree (entry)
        const entryFunction = node.functions.find(f => f.name === 'entry');
        if (!entryFunction) {
            accept('error', 'Program must contain function entry', { node, property: 'functions' });
        }
    }

    checkNameFunctionIsUnique(node: Program, accept: ValidationAcceptor): void {
        // Rule: Unicité des noms de fonctions
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

    checkNameVariableIsUnique(node: VariableDeclaration, accept: ValidationAcceptor): void {
        // Rule: Unicité des noms de variables
        const variableNames = new Set<string>();
        if (node.name) {
            if (variableNames.has(node.name)) {
                accept('error', `Variable name ${node.name} is not unique`, { node, property: 'name' });
            } else {
                variableNames.add(node.name);
            }
        }
    }

}
