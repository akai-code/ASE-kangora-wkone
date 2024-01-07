import { AdditiveExpression, Affectation, Block, BooleanExpression, ClockwiseCommand, Command, ControlCommand, Expression, ForwardCommand, FunctionCall, FunctionML, GetDistanceCommand, GetTimestampCommand, IfStatement, Instruction, LoopCommand, MovementCommand, MultiplicativeExpression, NumericExpression, Parameter, PrimaryExpression, Program, RoboMLVisitor, SetSpeedCommand, VariableDeclaration } from './visitor.js';
import { Scene } from '../web/scene.js';
import { DataType, UnitType } from '../language/generated/ast.js';
import { AstNode } from 'langium';

export class Context {
    public variables: Map<string, variableStorage> = new Map<string, variableStorage>();
    public returnVal: any;
    public isReturning = false;
}

export class variableStorage {
    public value: any;
    public type: string;
    constructor(value: any, type: string) {
        this.value = value;
        this.type = type;
    }
}

export class MyError {
    // Définissez la structure de votre erreur si nécessaire
}

export class InterpretorVisitor implements RoboMLVisitor {
    public typeErrors: MyError[] = [];
    public robotinstruction: any[] = [];
    public ctx = [new Context()];

    public progNode: Program | undefined;

    public scene: Scene;

    ensureType(node: AstNode, type: string, value: any): void {
        const variableType = typeof value;
        if (variableType !== type) {
            console.error(`Type mismatch in variable. Expected '${type}', but got '${variableType}'.`);
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }

    ensureLength(node: AstNode, length: number, index: any): void {
        const variableLength = index.length;
        if (variableLength !== length) {
            console.error(`Length mismatch in variable. Expected length '${length}', but got '${variableLength}'.`);
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }

    getCurrentContext() {
        return this.ctx[this.ctx.length - 1];
    }

    getVariable(name: string) {
        const context = this.getCurrentContext();
        if (context.variables.has(name)) {
            return context.variables.get(name)?.value;
        } else {
            console.error(`Variable '${name}' not found in the current context.`);
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }

    setVariable(name: string, value: any) {
        const context = this.getCurrentContext();
        const variable = context.variables.get(name);    
        if (variable != null) {
            variable.value = value;
        } else {
            console.error(`Variable '${name}' not found in the current context.`);
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }

    setListValue(name: string, value: any, index: number) {
        const context = this.getCurrentContext();
        const variable = context.variables.get(name);
    
        if (variable !== undefined) {
            if (variable.type === 'array') {
                if (index >= 0 && index < variable.value.length) {
                    variable.value[index] = value;
                } else {
                    console.error(`Index '${index}' out of bounds for array variable '${name}'.`);
                    // Gérer l'erreur ou lancer une exception si nécessaire
                }
            } else {
                console.error(`Variable '${name}' is not an array.`);
                // Gérer l'erreur ou lancer une exception si nécessaire
            }
        } else {
            console.error(`Variable '${name}' not found in the current context.`);
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }    

    printContext(): void {
        console.log("Contexte actuel : " + Array.from(this.getCurrentContext().variables.keys()));
    }

    constructor(scene: Scene) {
        this.scene = scene;
    }

    visit(node: Program, scene: Scene): any {
        this.scene = scene;
        this.progNode = node;
        this.visitProgram(node);
        return this.robotinstruction;
    }

    // Exemple de méthode visit :
    visitProgram(node: Program): any {
        const functionNames = new Set<string>();
        // Vérifie que chaque fonction est unique
        for (const func of node.functions) {
            if (functionNames.has(func.name)) {
                console.error(`La fonction '${func.name}' est définie plusieurs fois.`);
                // Gérer l'erreur ou lancer une exception si nécessaire
            } else {
                functionNames.add(func.name);
            }
        }
        // Recherche de la fonction "entry"
        const entryFunction = node.functions.find((f) => f.name === "entry");
        if (entryFunction) {
            entryFunction.accept(this); // Démarre l'interprétation à partir de la fonction "entry"
        } else {
            console.error("Aucune fonction 'entry' trouvée dans le programme");
            // Gérer l'erreur ou lancer une exception si nécessaire
        }
    }

    visitFunctionML(node: FunctionML): any {
        if (node.body) {
            node.body.accept(this);
        }
    }

    visitParameter(node: Parameter): any {
        // Logique pour interpréter un paramètre
        // ...
        console.log("Visiting Parameter");
    }

    visitBlock(node: Block): any {
        for (const instruction of node.instructions) {
            instruction.accept(this);
        }
    }

    visitInstruction(node: Instruction): any {
        // Logique pour interpréter une instruction
        // ...
        console.log("Visiting Instruction");
    }

    visitAffectation(node: Affectation): any {
        // Logique pour interpréter une affectation
        const variableName = node.variable;
        const value = this.visitNumericExpression(node.expression);
        this.setVariable(variableName, value);
    }

    visitCommand(node: Command): any {
        // Logique pour interpréter une commande
        // ...
        console.log("Visiting Command");
    }

    visitMovementCommand(node: MovementCommand): any {
        // Logique pour interpréter une commande de mouvement
        // ...
        console.log("Visiting MovementCommand");
    }

    visitForwardCommand(node: ForwardCommand): any {
        const distance = this.visitNumericExpression(node.distance);
        // Utilisez la scène pour déplacer le robot en avant
        this.scene.robot.move(distance);
    }

    visitClockwiseCommand(node: ClockwiseCommand): any {
    const angle = this.visitNumericExpression(node.angle); // Assurez-vous d'implémenter visitNumericExpression
    // Utilisez la scène pour faire tourner le robot dans le sens horaire
    this.scene.robot.turn(angle)
}

    visitControlCommand(node: ControlCommand): any {
        // Logique pour interpréter une commande de contrôle
        // ...
        console.log("Visiting ControlCommand");
    }

    visitIfStatement(node: IfStatement): any {
        // Logique pour interpréter une instruction if
        // ...
        console.log("Visiting IfStatement");
    }

    visitLoopCommand(node: LoopCommand): any {
        const context = this.getCurrentContext();
        const variableName = node.variable;
        const limit = this.visitNumericExpression(node.limit)
    
        if (!context.variables.has(variableName)) {
            context.variables.set(variableName, new variableStorage(0, 'number'));
        }
    
        while (context.variables.has(variableName) && context.variables.get(variableName)!.value < limit) {
            for (const instruction of node.body) {
                instruction.accept(this);
            }
            // Mettez à jour la variable de boucle
            context.variables.get(variableName)!.value += 1;
    
            // Vérifiez à nouveau la condition après la mise à jour
            if (context.variables.get(variableName)!.value >= limit) {
                break; // Sortez de la boucle si la condition n'est plus satisfaite
            }
        }
        console.log("Visiting LoopCommand");
    }
    
    

    visitSetSpeedCommand(node: SetSpeedCommand): any {
        const speed = this.visitNumericExpression(node.speed);
        // Utilisez la scène pour définir la vitesse du robot
        this.scene.robot.speed = speed;
    }

    visitGetDistanceCommand(node: GetDistanceCommand): any {
        // Logique pour interpréter une commande de distance
        // ...
        console.log("Visiting GetDistanceCommand");
    }

    visitGetTimestampCommand(node: GetTimestampCommand): any {
        // Logique pour interpréter une commande de timestamp
        // ...
        console.log("Visiting GetTimestampCommand");
    }

    visitVariableDeclaration(node: VariableDeclaration): any {
        const context = this.getCurrentContext();
        console.log("Current context : " + Array.from(context.variables.keys()));
        const variableName = node.name;
        const type = node.type;
        const initialValue = node.initialValue
        console.log("Variable name : " + variableName);
        console.log("Variable type : " + type);
        console.log("Variable initial value : " + initialValue);
    
        if (!context.variables.has(variableName)) {
            if (type === 'number') {
                if (initialValue !== null) {
                    this.ensureType(node, 'number', initialValue);
                }
                context.variables.set(variableName, new variableStorage(initialValue || 0, 'number'));
            } else {
                // Handle the case where an unsupported data type is encountered
                //this.typeErrors.push(new MyError(0, `Unsupported data type '${type}'.`, 'TypeError'));
            }
        } else {
            // Handle the case where the variable is already declared in the current context
            //this.typeErrors.push(new MyError(0, `Variable '${variableName}' is already declared in the current context.`, 'VariableError'));
        }
    }

    visitFunctionCall(node: FunctionCall): any {
        // const context = this.getCurrentContext();
        const functionName = node.functionName;
        const targetFunction = this.progNode?.functions.find((func) => func.name === functionName);

        if (targetFunction) {
            const newContext = new Context();
            this.ctx.push(newContext);

            if (node.arg) {
                node.arg.forEach((arg, index) => {
                    //const parameter = targetFunction.parameters[index];
                    //const value = arg.accept(this);
                    //newContext.variables.set(parameter.name, new variableStorage(value, parameter.type));
                });
            }

            targetFunction.body?.accept(this);

            const returnValue = newContext.returnVal;
            this.ctx.pop(); // Pop the function context
            return returnValue;
        } else {
            return null;
        }
    }

    visitExpression(node: Expression): any {
        //return node.accept(this);
    }

    visitNumericExpression(node: NumericExpression): any {
        if (node instanceof AdditiveExpression) {
            return this.visitAdditiveExpression(node);
        } else if (node instanceof MultiplicativeExpression) {
            return this.visitMultiplicativeExpression(node);
        } else if (node instanceof PrimaryExpression) {
            return this.visitPrimaryExpression(node);
        }
    }

    visitAdditiveExpression(node: AdditiveExpression): any {
        const left = node.$container.left.accept(this);
        const right = node.right.accept(this);

        if (node.op === '+') {
            return left + right;
        } else if (node.op === '-') {
            return left - right;
        }

        //this.typeErrors.push(new MyError(0, `Unsupported operator '${node.operator}' in additive expression.`, 'OperatorError'));
        return null;
    }

    visitMultiplicativeExpression(node: MultiplicativeExpression): any {
        const left = node.$container.left.accept(this);
        const right = node.right.accept(this);

        if (node.op === '*') {
            return left * right;
        } else if (node.op === '/') {
            if (right !== 0) {
                return left / right;
            } else {
                //this.typeErrors.push(new MyError(0, `Division by zero in multiplicative expression.`, 'DivisionError'));
                return null;
            }
        }

        //this.typeErrors.push(new MyError(0, `Unsupported operator '${node.operator}' in multiplicative expression.`, 'OperatorError'));
        return null;
    }

    visitPrimaryExpression(node: PrimaryExpression): any {
        if (node instanceof NumericExpression) {
            return this.visitNumericExpression(node);
        } else if (typeof node === 'number') {
            return node; // It's an INT
        } else if (node instanceof FunctionCall) {
            return this.visitFunctionCall(node);
        } else {
            //this.typeErrors.push(new MyError(0, `Invalid primary expression.`, 'ExpressionError'));
            return null;
        }
    }

    visitBooleanExpression(node: BooleanExpression): any {
        const left = node.left.accept(this);
        const right = node.right.accept(this);

        if (node.operator == '<') {
            return left < right;
        } else if (node.operator === '>') {
            return left > right;
        } else if (node.operator === '==') {
            return left === right;
        } else if (node.operator === '!=') {
            return left !== right;
        }

        //this.typeErrors.push(new MyError(0, `Unsupported operator '${node.operator}' in boolean expression.`, 'OperatorError'));
        return null;
    }

    visitUnitType(node: UnitType) {
        console.log('Visiting UnitType');
        // Mettez en œuvre la logique spécifique pour les types d'unités ici
        return null;
    }
    visitDataType(node: DataType) {
        console.log('Visiting DataType');
        // Mettez en œuvre la logique spécifique pour les types de données ici
        return null;
    }
}

export class interpreter {
    static typeErors = [];

    static interpret(model: Program, scene: Scene): any[] {
        this.typeErors = [];
        const visitor = new InterpretorVisitor(scene);
        const startTime = Date.now();
        const statements = visitor.visit(model, scene);
        //this.typeErors = visitor.typeErrors;
        const endTime = Date.now();
        console.log(`Interprétation a pris ${endTime - startTime}ms`);
        return statements;
    }
}