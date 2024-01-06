// interpreter.ts
import { DataType, UnitType } from '../language/generated/ast.js';
import { AdditiveExpression, Affectation, Block, BooleanExpression, ClockwiseCommand, Command, ControlCommand, Expression, ForwardCommand, FunctionCall, FunctionML, GetDistanceCommand, GetTimestampCommand, IfStatement, Instruction, LoopCommand, MovementCommand, MultiplicativeExpression, NumericExpression, Parameter, PrimaryExpression, Program, RoboMLVisitor, SetSpeedCommand, VariableDeclaration } from './visitor.js';


// Import any other necessary modules or simulators

export class RoboMLInterpreter implements RoboMLVisitor {
    // Méthode principale pour interpréter un programme
    public visitProgram(program: Program): void {
        program.functions.forEach(func => {
            if (func.name === 'entry') {
                // declenche visite de la fonction entry
                this.visitFunctionML(func);
            }
            else {
                // le programme ne peut pas etre interprete
                throw new Error('Programme non interpretable');
            }
        });
    }
    // Méthode de visite pour interpréter une fonction
    public visitFunctionML(FunctionML: FunctionML): any {
        console.log(`Entering function: ${FunctionML.name}`);
        // Visiter les paramètres
        FunctionML.parameters.forEach(param => this.visitParameter(param));
        // Visiter le corps de la fonction (block)
        this.visitBlock(FunctionML.body);
        console.log(`Exiting function: ${FunctionML.name}`);
        return null;
    }

    visitParameter(Parameter: Parameter): any {
        // stocker tous les parametres dans un contexte d'exécution
        //Parameter.accept(this);
        return null;
    }
    visitBlock(block: Block): any {
        console.log('Entering block');
        block.instructions.forEach(instruction => this.visitInstruction(instruction));
        console.log('Exiting block');
        return null;
    }

    visitInstruction(instruction: Instruction): any {
        if (instruction instanceof Affectation) {
            this.visitAffectation(instruction);
        } else if ((instruction instanceof ClockwiseCommand) || instruction instanceof ForwardCommand || instruction instanceof SetSpeedCommand) {
            this.visitMovementCommand(instruction);
        } else if (instruction instanceof IfStatement) {
            this.visitIfStatement(instruction);
        } else if (instruction instanceof LoopCommand) {
            this.visitLoopCommand(instruction);
        } else if (instruction instanceof FunctionCall) {
            this.visitFunctionCall(instruction);
        } else if (instruction instanceof VariableDeclaration) {
            this.visitVariableDeclaration(instruction);
        } else if (instruction instanceof GetTimestampCommand) {
            this.visitGetTimestampCommand(instruction);
        } else if (instruction instanceof GetDistanceCommand) {
            this.visitGetDistanceCommand(instruction);
        } else if (instruction instanceof ControlCommand) {
            this.visitControlCommand(instruction);
        } else {
            throw new Error('Instruction non prise en charge');
        }
        // Ajoutez des branches pour les autres types d'instructions si nécessaire
        return null;
    }

    visitAffectation(affectation: Affectation) {
        console.log('Visiting Affectation');
        const variableName = affectation.variable;
        const expressionValue = this.evaluateExpression(affectation.expression);
        // Affecter la valeur de l'expression à la variable
        console.log(`Assigning ${expressionValue} to ${variableName}`);
        return null;
    }

    visitCommand(command: Command) {
        console.log('Visiting Command');
        return null;
    }

    visitMovementCommand(movementCommand: MovementCommand) {
        console.log('Visiting MovementCommand');
        return null;
    }

    visitForwardCommand(forwardCommand: ForwardCommand) {
        console.log('Visiting ForwardCommand');
        const distanceValue = this.evaluateExpression(forwardCommand.distance);
        const unitValue = forwardCommand.unit;
        // Faire avancer le robot
        console.log(`Moving forward ${distanceValue}${unitValue}`);
    }

    visitClockwiseCommand(clockwiseCommand: ClockwiseCommand) {
        console.log('Visiting ClockwiseCommand');
        const angleValue = this.evaluateExpression(clockwiseCommand.angle);
        // Faire tourner le robot
        console.log(`Turning clockwise ${angleValue}`);
    }
    visitSetSpeedCommand(setSpeedCommand: SetSpeedCommand) {
        console.log('Visiting SetSpeedCommand');
        const speedValue = this.evaluateExpression(setSpeedCommand.speed);
        // Changer la vitesse du robot
        console.log(`Setting speed to ${speedValue}`);
    }
    visitControlCommand(controlCommand: ControlCommand) {
        console.log('Visiting ControlCommand');
        return null;
    }
    visitIfStatement(ifStatement: IfStatement): any {
        console.log('Visiting IfStatement');
        const conditionValue = this.evaluateBooleanExpression(ifStatement.condition);
        console.log(`Condition value: ${conditionValue}`);
        // Mettez en œuvre la logique spécifique pour les instructions IfStatement ici
        if (conditionValue) {
            //this.visitBlock(ifStatement.ifBranch);
        } else {
            //this.visitBlock(ifStatement.elseBranch);
        }
        return null;
    }
    visitLoopCommand(loopCommand: LoopCommand): any {
        console.log('Visiting LoopCommand');
        const variableName = loopCommand.variable;
        const limitValue = this.evaluateExpression(loopCommand.limit);
        // Mettez en œuvre la logique spécifique pour les boucles ici
        console.log(`Looping with variable ${variableName} and limit ${limitValue}`);
        //this.visitBlock(loopCommand.body);
        return null;
    }
    visitGetTimestampCommand(getTimestampCommand: GetTimestampCommand): any {
        console.log('Visiting GetTimestampCommand');
        // Mettez en œuvre la logique spécifique pour les commandes GetTimestampCommand ici
        return null;
    }
    visitGetDistanceCommand(getDistanceCommand: GetDistanceCommand): any {
        console.log('Visiting GetDistanceCommand');
        // Mettez en œuvre la logique spécifique pour les commandes GetDistanceCommand ici
        return null;
    }
    visitFunctionCall(functionCall: FunctionCall): any {
        console.log('Visiting FunctionCall');
        const functionName = functionCall.functionName;
        //const argValues = functionCall.arg.map(arg => this.evaluateExpression(arg));
        // Mettez en œuvre la logique spécifique pour les appels de fonction ici ${argValues}
        console.log(`Calling function ${functionName} with arguments: `);
        return null;
    }
    visitVariableDeclaration(variableDeclaration: VariableDeclaration): any {
        console.log('Visiting VariableDeclaration');
        const initialValue = this.evaluateExpression(variableDeclaration.initialValue);
        const variableType = variableDeclaration.type;
        // Mettez en œuvre la logique spécifique pour les déclarations de variable ici
        console.log(`Variable declared with initial value ${initialValue} and type ${variableType}`);
        return null;
    }
    visitNumericExpression(node: NumericExpression): any {
        const left = this.visitNumericExpression(node.left);
        const right = this.visitNumericExpression(node.right);

        switch (node.op) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            // Gérez les autres opérateurs selon les besoins
            default:
                throw new Error(`Opérateur numérique non pris en charge: ${node.op}`);
        }
    }
    visitAdditiveExpression(node: AdditiveExpression): any {
        console.log('Visiting AdditiveExpression');
        const leftValue = this.evaluateExpression(node.$container);
        const rightValue = node.right.accept(this);
        const op = node.op;
        const result = op === '+' ? leftValue + rightValue : leftValue - rightValue;
        console.log(`Result of ${node.op} operation: ${result}`);
        // Mettez en œuvre la logique spécifique pour les expressions additives ici
        return result;
    }
    visitMultiplicativeExpression(node: MultiplicativeExpression) {
        console.log('Visiting MultiplicativeExpression');
        const leftValue = this.evaluateExpression(node.$container);
        const rightValue = node.right.accept(this);
        const op = node.op;
        const result = op === '*' ? leftValue * rightValue : leftValue / rightValue;
        console.log(`Result of ${node.op} operation: ${result}`);
        // Mettez en œuvre la logique spécifique pour les expressions multiplicatives ici
        return result;
    }
    visitPrimaryExpression(node: PrimaryExpression) {
        console.log('Visiting PrimaryExpression');
        // Mettez en œuvre la logique spécifique pour les expressions primaires ici
        return this.evaluateExpression(node.$container);
    }
    visitBooleanExpression(node: BooleanExpression) {
        console.log('Visiting BooleanExpression');
        // Mettez en œuvre la logique spécifique pour les expressions booléennes ici
        return true;
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
    visitExpression(node: Expression) {
        console.log('Visiting Expression');
        // Mettez en œuvre la logique spécifique pour les expressions ici
        return node.$container.accept(this);
    }

    private evaluateExpression(expression: NumericExpression): number {
        return 42;
    }
    private evaluateBooleanExpression(booleanExpression: BooleanExpression): boolean {
        return true;
    }

    // propriétés interpret pour interpreter le programme
    interpret (program: Program): void {
        this.visitProgram(program);
    }

}
