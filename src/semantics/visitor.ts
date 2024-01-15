import * as ASTInterfaces from '../language/generated/ast.js';
import { InterpretorVisitor } from './interpreter.js';

export interface RoboMLVisitor {
    visitProgram(node: ASTInterfaces.Program): any;
    visitFunctionML(node: ASTInterfaces.FunctionML): any;
    visitParameter(node: ASTInterfaces.Parameter): any;
    visitBlock(node: ASTInterfaces.Block): any;
    visitInstruction(node: ASTInterfaces.Instruction): any;
    visitAffectation(node: ASTInterfaces.Affectation): any;
    visitCommand(node: ASTInterfaces.Command): any;
    visitMovementCommand(node: ASTInterfaces.MovementCommand): any;
    visitForwardCommand(node: ASTInterfaces.ForwardCommand): any;
    visitClockwiseCommand(node: ASTInterfaces.ClockwiseCommand): any;
    visitSetSpeedCommand(node: ASTInterfaces.SetSpeedCommand): any;
    visitControlCommand(node: ASTInterfaces.ControlCommand): any;
    visitIfStatement(node: ASTInterfaces.IfStatement): any;
    visitLoopCommand(node: ASTInterfaces.LoopCommand): any;
    visitGetTimestampCommand(node: ASTInterfaces.GetTimestampCommand): any;
    visitGetDistanceCommand(node: ASTInterfaces.GetDistanceCommand): any;
    visitFunctionCall(node: ASTInterfaces.FunctionCall): any;
    visitVariableDeclaration(node: ASTInterfaces.VariableDeclaration): any;
    visitNumericExpression(node: ASTInterfaces.NumericExpression): any;
    visitAdditiveExpression(node: ASTInterfaces.AdditiveExpression): any;
    visitMultiplicativeExpression(node: ASTInterfaces.MultiplicativeExpression): any;
    visitPrimaryExpression(node: ASTInterfaces.PrimaryExpression): any;
    visitBooleanExpression(node: ASTInterfaces.BooleanExpression): any;
    visitUnitType(node: ASTInterfaces.UnitType): any;
    visitDataType(node: ASTInterfaces.DataType): any;
    visitExpression(node: ASTInterfaces.Expression): any;
}

// create one concrete class for each concept
export class Program implements ASTInterfaces.Program {
    // Attributes
    $type: 'Program' = 'Program';
    functions: FunctionML[] = [];
    // Constructor
    constructor(functions: FunctionML[]) {
        this.functions = functions;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        return visitor.visitProgram(this);
    }
}

export class FunctionML implements ASTInterfaces.FunctionML {
    $type: 'FunctionML' = 'FunctionML';
    returnType: ASTInterfaces.DataType;
    name: string;
    parameters: Parameter[];
    body: Block;
    $container: ASTInterfaces.Program;

    constructor(returnType: ASTInterfaces.DataType, name: string, parameters: Parameter[], body: Block, $container: ASTInterfaces.Program) {
        this.returnType = returnType;
        this.name = name;
        this.parameters = parameters;
        this.body = body;
        this.$container = $container;
    }

    accept(_visitor: InterpretorVisitor): any {
        console.log("je suis dans la fonction accept de FunctionML");
    }
}

export class Parameter implements ASTInterfaces.Parameter {
    $type: 'Parameter' = 'Parameter';
    type: ASTInterfaces.DataType;
    name: string;
    $container: ASTInterfaces.FunctionML;

    constructor(type: ASTInterfaces.DataType, name: string, $container: ASTInterfaces.FunctionML) {
        this.type = type;
        this.name = name;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitParameter(this);
    }
}

export class Block implements ASTInterfaces.Block {
    $type: 'Block' = 'Block';
    instructions: Instruction[];
    $container: ASTInterfaces.FunctionML;

    constructor(instructions: Instruction[], $container: ASTInterfaces.FunctionML) {
        this.instructions = instructions;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitBlock(this);
    }
}

export class Instruction implements ASTInterfaces.Instruction {
    $type: 'Instruction' = 'Instruction';
    $container: ASTInterfaces.Block;

    constructor($container: ASTInterfaces.Block) {
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitInstruction(this);
    }
}

export class Affectation implements ASTInterfaces.Affectation {
    $type: 'Affectation' = 'Affectation';
    expression: NumericExpression;
    variable: string;
    $container: ASTInterfaces.Instruction;

    constructor(expression: NumericExpression, variable: string, $container: ASTInterfaces.Instruction) {
        this.expression = expression;
        this.variable = variable;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitAffectation(this);
    }
}

export class Command implements ASTInterfaces.Command {
    $type: 'Command' = 'Command';
    $container: ASTInterfaces.Instruction;

    constructor($container: ASTInterfaces.Instruction) {
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitCommand(this);
    }
}

export class MovementCommand implements ASTInterfaces.MovementCommand {
    $type: 'MovementCommand' = 'MovementCommand';
    value?: ASTInterfaces.Expression;
    $container: ASTInterfaces.Instruction;

    constructor($container: ASTInterfaces.Instruction, value?: ASTInterfaces.Expression) {
        this.$container = $container;
        this.value = value;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMovementCommand(this);
    }
}

export class ForwardCommand implements ASTInterfaces.ForwardCommand {
    $type: 'ForwardCommand' = 'ForwardCommand';
    distance: number;
    unit: ASTInterfaces.UnitType;
    $container: ASTInterfaces.Instruction;

    constructor(distance: number, unit: ASTInterfaces.UnitType, $container: ASTInterfaces.Instruction) {
        this.distance = distance;
        this.unit = unit;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitForwardCommand(this);
    }
}

export class ClockwiseCommand implements ASTInterfaces.ClockwiseCommand {
    $type: 'ClockwiseCommand' = 'ClockwiseCommand';
    angle: number;
    $container: ASTInterfaces.Instruction;

    constructor(angle: number, $container: ASTInterfaces.Instruction) {
        this.angle = angle;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitClockwiseCommand(this);
    }
}

export class SetSpeedCommand implements ASTInterfaces.SetSpeedCommand {
    $type: 'SetSpeedCommand' = 'SetSpeedCommand';
    speed: NumericExpression;
    unit: ASTInterfaces.UnitType;
    $container: ASTInterfaces.Instruction;

    constructor(speed: NumericExpression, unit: ASTInterfaces.UnitType, $container: ASTInterfaces.Instruction) {
        this.speed = speed;
        this.unit = unit;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitSetSpeedCommand(this);
    }
}

export class ControlCommand implements ASTInterfaces.ControlCommand {
    $type: 'ControlCommand' = 'ControlCommand';
    $container: ASTInterfaces.Instruction;

    constructor($container: ASTInterfaces.Instruction) {
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitControlCommand(this);
    }
}

export class IfStatement implements ASTInterfaces.IfStatement {
    $type: 'IfStatement' = 'IfStatement';
    condition: BooleanExpression;
    elseBranch: Instruction[];
    ifBranch: ASTInterfaces.Instruction[];
    $container: ASTInterfaces.Instruction;

    constructor(condition: BooleanExpression, elseBranch: Instruction[], ifBranch: ASTInterfaces.Instruction[], $container: ASTInterfaces.Instruction) {
        this.condition = condition;
        this.elseBranch = elseBranch;
        this.ifBranch = ifBranch;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitIfStatement(this);
    }
}

export class LoopCommand implements ASTInterfaces.LoopCommand {
    $type: 'LoopCommand' = 'LoopCommand';
    body: Instruction[];
    limit: NumericExpression;
    variable: string;
    $container: ASTInterfaces.Instruction;

    constructor(body: Instruction[], limit: NumericExpression, variable: string, $container: ASTInterfaces.Instruction) {
        this.body = body;
        this.limit = limit;
        this.variable = variable;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitLoopCommand(this);
    }
}

export class GetTimestampCommand implements ASTInterfaces.GetTimestampCommand {
    $type: 'GetTimestampCommand' = 'GetTimestampCommand';
    variable: ASTInterfaces.VariableDeclaration;
    $container: ASTInterfaces.Instruction;

    constructor(variable: ASTInterfaces.VariableDeclaration, $container: ASTInterfaces.Instruction) {
        this.variable = variable;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitGetTimestampCommand(this);
    }
}

export class GetDistanceCommand implements ASTInterfaces.GetDistanceCommand {
    $type: 'GetDistanceCommand' = 'GetDistanceCommand';
    variable: ASTInterfaces.VariableDeclaration;
    $container: ASTInterfaces.Instruction;

    constructor(variable: ASTInterfaces.VariableDeclaration, $container: ASTInterfaces.Instruction) {
        this.variable = variable;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitGetDistanceCommand(this);
    }
}

export class FunctionCall implements ASTInterfaces.FunctionCall {
    $type: 'FunctionCall' = 'FunctionCall';
    functionName: string;
    arg: ASTInterfaces.Expression[];
    $container: ASTInterfaces.Instruction;

    constructor(functionName: string, arg: ASTInterfaces.Expression[], $container: ASTInterfaces.Instruction) {
        this.functionName = functionName;
        this.arg = arg;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitFunctionCall(this);
    }
}

export class VariableDeclaration implements ASTInterfaces.VariableDeclaration {
    $type: 'VariableDeclaration' = 'VariableDeclaration';
    initialValue: number
    type: ASTInterfaces.DataType;
    name: string;
    $container: ASTInterfaces.GetTimestampCommand | ASTInterfaces.GetDistanceCommand;

    constructor(name: string,initialValue: number, type: ASTInterfaces.DataType, $container: ASTInterfaces.GetTimestampCommand | ASTInterfaces.GetDistanceCommand) {
        this.initialValue = initialValue;
        this.type = type;
        this.$container = $container;
        this.name = name;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitVariableDeclaration(this);
    }
}

export class NumericExpression implements ASTInterfaces.NumericExpression {
    $type: 'NumericExpression' = 'NumericExpression';
    left: NumericExpression;
    op: ASTInterfaces.NumericOperator;
    right: NumericExpression;
    $container: ASTInterfaces.Expression;

    constructor(left: NumericExpression, op: ASTInterfaces.NumericOperator, right: NumericExpression, $container: ASTInterfaces.Expression) {
        this.left = left;
        this.op = op;
        this.right = right;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitNumericExpression(this);
    }
}

export class AdditiveExpression implements ASTInterfaces.AdditiveExpression {
    $type: 'AdditiveExpression' = 'AdditiveExpression';
    op: ASTInterfaces.NumericOperator;
    right: MultiplicativeExpression;
    $container: NumericExpression;

    constructor(op: ASTInterfaces.NumericOperator, right: MultiplicativeExpression, $container: NumericExpression) {
        this.op = op;
        this.right = right;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitAdditiveExpression(this);
    }
}

export class MultiplicativeExpression implements ASTInterfaces.MultiplicativeExpression {
    $type: 'MultiplicativeExpression' = 'MultiplicativeExpression';
    op: ASTInterfaces.NumericOperator;
    right: PrimaryExpression;
    $container: NumericExpression;

    constructor(op: ASTInterfaces.NumericOperator, right: PrimaryExpression, $container: NumericExpression) {
        this.op = op;
        this.right = right;
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitMultiplicativeExpression(this);
    }
}

export class PrimaryExpression implements ASTInterfaces.PrimaryExpression {
    $type: 'PrimaryExpression' = 'PrimaryExpression';
    $container: NumericExpression;

    constructor($container: NumericExpression) {
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitPrimaryExpression(this);
    }
}

export class BooleanExpression implements ASTInterfaces.BooleanExpression {
    $type: 'BooleanExpression' = 'BooleanExpression';
    $container: ASTInterfaces.IfStatement;
    left: NumericExpression; // Adjust the type based on your actual structure
    right: NumericExpression;
    operator: '==' | '!=' | '<' | '>' | '<=' | '>=';
    
    constructor($container: ASTInterfaces.IfStatement, left: NumericExpression, operator: '==' | '!=' | '<' | '>' | '<=' | '>=', right: NumericExpression) {
        this.$container = $container;
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitBooleanExpression(this);
    }
}

export class Expression implements ASTInterfaces.Expression {
    $type: 'Expression' = 'Expression';
    $container: Expression;

    constructor($container: Expression) {
        this.$container = $container;
    }

    accept(visitor: RoboMLVisitor): any {
        return visitor.visitExpression(this);
    }
}
