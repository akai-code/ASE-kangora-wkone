import * as ASTInterfaces from '../language/generated/ast.js';
import { GetDistanceCommand, GetTimestampCommand, NumericOperator, UnitType } from '../language/generated/ast.js';
//import { NumericExpression } from '../language/generated/ast.js';
// import { Reference } from 'langium';

export interface RoboMLVisitor {
    visitProgram(node: ASTInterfaces.Program): any;
    visitFunctionML(node: ASTInterfaces.FunctionML): any;
    // visitParameter(node: ASTInterfaces.Parameter): any;
    visitBlock(node: ASTInterfaces.Block): any;
    visitInstruction(node: ASTInterfaces.Instruction): any;
    visitAffectation(node: ASTInterfaces.Affectation): any;
    visitCommand(node: ASTInterfaces.Command): any;
    visitMovementCommand(node: ASTInterfaces.MovementCommand): any;
    visitForwardCommand(node: ASTInterfaces.ForwardCommand): any;
    visitClockwiseCommand(node: ASTInterfaces.ClockwiseCommand): any;
    visitSetSpeedCommand(node: ASTInterfaces.SetSpeedCommand): any;
    // visitControlCommand(node: ASTInterfaces.ControlCommand): any;
    // visitIfStatement(node: ASTInterfaces.IfStatement): any;
    visitLoopCommand(node: ASTInterfaces.LoopCommand): any;
    // visitGetTimestampCommand(node: ASTInterfaces.GetTimestampCommand): any;
    // visitGetDistanceCommand(node: ASTInterfaces.GetDistanceCommand): any;
    visitFunctionCall(node: ASTInterfaces.FunctionCall): any;
    visitVariableDeclaration(node: ASTInterfaces.VariableDeclaration): any;
    visitNumericExpression(node: ASTInterfaces.NumericExpression): any;
    // visitAdditiveExpression(node: ASTInterfaces.AdditiveExpression): any;
    // visitMultiplicativeExpression(node: ASTInterfaces.MultiplicativeExpression): any;
    // visitPrimaryExpression(node: ASTInterfaces.PrimaryExpression): any;
    // visitBooleanExpression(node: ASTInterfaces.BooleanExpression): any;
    // visitUnitType(node: ASTInterfaces.UnitType): any;
    // visitDataType(node: ASTInterfaces.DataType): any;
    visitExpression(node: ASTInterfaces.Expression): any;
}


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
        visitor.visitProgram(this);
    }
}

//
export class FunctionML implements ASTInterfaces.FunctionML{
    // Attributes
    readonly $container!: ASTInterfaces.Program;
    readonly $type: 'FunctionML' = 'FunctionML';
    body: Block;
    parameters: Array<ASTInterfaces.Parameter>;
    returnType?: ASTInterfaces.DataType;
    name?: string ;
    // Constructor
    constructor(name: string,parameters: ASTInterfaces.Parameter[], block: Block) {
        // this.name = name;
        this.parameters = parameters;
        this.body = block;
        this.name = name ;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the FunctionML node
        return visitor.visitFunctionML(this);
    }

}


export class Block implements ASTInterfaces.Block {
    // Attributes
    readonly $container!: FunctionML;
    readonly $type!: 'Block';
    instructions: Array<Instruction>
    // Constructor
    constructor(intructions : Array<Instruction>) {
        this.instructions = intructions ;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitBlock(this);
    }
}


export class Affectation implements ASTInterfaces.Affectation {
    // Attributes
    readonly $type: 'Affectation' = "Affectation";
    expression: NumericExpression;
    variable!: string;
    // Constructor
    constructor(expression:NumericExpression,variable:string) {
        this.variable=variable;
        this.expression=expression;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitAffectation(this);
    }
}


export class Instruction implements ASTInterfaces.Instruction {
    // Attributes
    readonly $type: 'Affectation' | 'ClockwiseCommand' | 'Command' | 'ControlCommand' | 'CustomCommand' | 'ForwardCommand' | 'FunctionCall' | 'GetDistanceCommand' | 'GetTimestampCommand' | 'Instruction' | 'MovementCommand' | 'SetSpeedCommand' = "Affectation";
    // Constructor
    constructor(){}
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitInstruction(this);
    }
}


export class NumericExpression implements ASTInterfaces.NumericExpression {
    // Attributes
    readonly $type: 'AdditiveExpression' | 'MultiplicativeExpression' | 'NumericExpression' | 'PrimaryExpression' = "AdditiveExpression";
    left?: NumericExpression
    op?: NumericOperator
    right?: NumericExpression
    // Constructor
    constructor(left:NumericExpression,op:NumericOperator,right:NumericExpression) {
        this.left=left;
        this.right=right;
        this.op=op;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitNumericExpression(this);
    }
}

export class Expression implements ASTInterfaces.Expression {
    // Attributes
    readonly $type: 'AdditiveExpression' | 'BooleanExpression' | 'Expression' | 'MultiplicativeExpression' | 'NumericExpression' | 'PrimaryExpression' = "AdditiveExpression";
    // Constructor
    constructor() {}
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitExpression(this);
    }
}

export class SetSpeedCommand implements ASTInterfaces.SetSpeedCommand {
    // Attributes
    readonly $type: 'SetSpeedCommand' = "SetSpeedCommand";
    speed!: NumericExpression;
    unit: ASTInterfaces.UnitType = "cm";   
    // Constructor
    constructor(speed:NumericExpression,unit:ASTInterfaces.UnitType) {
        this.speed=speed;
        this.unit=unit ;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        // Visit the Program node
        visitor.visitSetSpeedCommand(this);
    }
}

export class Command implements ASTInterfaces.Command {
    // Attributes
    readonly $type: 'ClockwiseCommand' | 'Command' | 'ForwardCommand' | 'MovementCommand' | 'SetSpeedCommand' = "SetSpeedCommand";   
    // Constructor
    constructor() {}
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitCommand(this);
    }
}



export class MovementCommand implements ASTInterfaces.MovementCommand {
    // Attributes
    readonly $type: 'ClockwiseCommand' | 'ForwardCommand' | 'MovementCommand' | 'SetSpeedCommand' = "SetSpeedCommand";
    value?: Expression    
    // Constructor
    constructor() {}
    // accept method
    accept(visitor: RoboMLVisitor): any {

        visitor.visitMovementCommand(this);
    }
}

export class FunctionCall implements ASTInterfaces.FunctionCall {
    // Attributes
    readonly $type: 'CustomCommand' | 'FunctionCall' = "CustomCommand";
    arg: Array<Expression> = [];
    functionName!: string; 
    // Constructor
    constructor(functname:string,arg:Array<Expression>) {
        this.functionName = functname ;
        this.arg = arg ;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitFunctionCall(this);
    }
}

export class VariableDeclaration implements ASTInterfaces.VariableDeclaration {
    // Attributes
    readonly $container!: GetDistanceCommand | GetTimestampCommand;
    readonly $type!: 'VariableDeclaration';
    initialValue!: NumericExpression;
    type?: ASTInterfaces.DataType ;
    name?: string | undefined;
    // Constructor
    constructor(type:ASTInterfaces.DataType,initialValue:NumericExpression,name:string) {
        this.type=type;
        this.initialValue=initialValue;
        this.name = name;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitVariableDeclaration(this);
    }
    //
}

export class LoopCommand implements ASTInterfaces.LoopCommand {
    // Attributes
    readonly $type: 'LoopCommand' = "LoopCommand";
    body: Array<Instruction> = [];
    limit!: NumericExpression;
    variable!: string;
    // Constructor
    constructor(body:Array<Instruction>,limit:NumericExpression,variable:string) {
        this.variable=variable;
        this.body=body;
        this.limit=limit;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitLoopCommand(this);
    }
    //
}

export class ForwardCommand implements ASTInterfaces.ForwardCommand {
    // Attributes
    readonly $type: 'ForwardCommand' = "ForwardCommand";
    distance!: NumericExpression;
    unit!: UnitType;
    // Constructor
    constructor(distance:NumericExpression,unit:UnitType) {
        this.distance=distance;
        this.unit=unit;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitForwardCommand(this);
    }
}


export class ClockwiseCommand implements ASTInterfaces.ClockwiseCommand{
    // Attributes
    readonly $type: 'ClockwiseCommand' = "ClockwiseCommand";
    angle!: NumericExpression;
    // Constructor
    constructor(angle:NumericExpression) {
        this.angle=angle ;
    }
    // accept method
    accept(visitor: RoboMLVisitor): any {
        visitor.visitClockwiseCommand(this);
    }
}
