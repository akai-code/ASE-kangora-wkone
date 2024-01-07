import type { ValidationAcceptor, ValidationChecks } from 'langium';
import * as InterfaceAST from '../language/generated/ast.js';
import { RoboMLVisitor } from './visitor.js';
import type { RobbotMlServices } from '../language/robbot-ml-module.js';

export function weaveAcceptMethods(services: RobbotMlServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new RobbotMlAcceptWeaver();
    registry.register(weaver.checks, weaver);
}

export class RobbotMlAcceptWeaver {
    weaveProgram(node: InterfaceAST.Program, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitProgram(node);
        };
    }

    weaveFunctionML(node: InterfaceAST.FunctionML, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitFunctionML(node);
        };
    }

    weaveParameter(node: InterfaceAST.Parameter, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitParameter(node);
        };
    }

    weaveBlock(node: InterfaceAST.Block, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitBlock(node);
        };
    }

    weaveInstruction(node: InterfaceAST.Instruction, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitInstruction(node);
        };
    }

    weaveAffectation(node: InterfaceAST.Affectation, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitAffectation(node);
        };
    }

    weaveCommand(node: InterfaceAST.Command, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitCommand(node);
        };
    }

    weaveMovementCommand(node: InterfaceAST.MovementCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitMovementCommand(node);
        };
    }

    weaveForwardCommand(node: InterfaceAST.ForwardCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitForwardCommand(node);
        };
    }

    weaveClockwiseCommand(node: InterfaceAST.ClockwiseCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitClockwiseCommand(node);
        };
    }

    weaveSetSpeedCommand(node: InterfaceAST.SetSpeedCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitSetSpeedCommand(node);
        };
    }

    weaveControlCommand(node: InterfaceAST.ControlCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitControlCommand(node);
        };
    }

    weaveIfStatement(node: InterfaceAST.IfStatement, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitIfStatement(node);
        };
    }

    weaveLoopCommand(node: InterfaceAST.LoopCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitLoopCommand(node);
        };
    }

    weaveGetTimestampCommand(node: InterfaceAST.GetTimestampCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitGetTimestampCommand(node);
        };
    }

    weaveGetDistanceCommand(node: InterfaceAST.GetDistanceCommand, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitGetDistanceCommand(node);
        };
    }

    weaveFunctionCall(node: InterfaceAST.FunctionCall, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitFunctionCall(node);
        };
    }

    weaveVariableDeclaration(node: InterfaceAST.VariableDeclaration, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitVariableDeclaration(node);
        };
    }

    weaveNumericExpression(node: InterfaceAST.NumericExpression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitNumericExpression(node);
        };
    }

    weaveAdditiveExpression(node: InterfaceAST.AdditiveExpression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitAdditiveExpression(node);
        };
    }

    weaveMultiplicativeExpression(node: InterfaceAST.MultiplicativeExpression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitMultiplicativeExpression(node);
        };
    }

    weavePrimaryExpression(node: InterfaceAST.PrimaryExpression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitPrimaryExpression(node);
        };
    }

    weaveBooleanExpression(node: InterfaceAST.BooleanExpression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitBooleanExpression(node);
        };
    }

    weaveUnitType(node: InterfaceAST.UnitType, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitUnitType(node);
        };
    }

    weaveDataType(node: InterfaceAST.DataType, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitDataType(node);
        };
    }

    weaveExpression(node: InterfaceAST.Expression, accept: ValidationAcceptor): void {
        (node as any).accept = (visitor: RoboMLVisitor) => {
            return visitor.visitExpression(node);
        };
    }

    checks: ValidationChecks<InterfaceAST.RobbotMlAstType> = {
        Program: this.weaveProgram,
        FunctionML: this.weaveFunctionML,
        Parameter: this.weaveParameter,
        Block: this.weaveBlock,
        Instruction: this.weaveInstruction,
        Affectation: this.weaveAffectation,
        Command: this.weaveCommand,
        MovementCommand: this.weaveMovementCommand,
        ForwardCommand: this.weaveForwardCommand,
        ClockwiseCommand: this.weaveClockwiseCommand,
        SetSpeedCommand: this.weaveSetSpeedCommand,
        ControlCommand: this.weaveControlCommand,
        IfStatement: this.weaveIfStatement,
        LoopCommand: this.weaveLoopCommand,
        GetTimestampCommand: this.weaveGetTimestampCommand,
        GetDistanceCommand: this.weaveGetDistanceCommand,
        FunctionCall: this.weaveFunctionCall,
        VariableDeclaration: this.weaveVariableDeclaration,
        NumericExpression: this.weaveNumericExpression,
        AdditiveExpression: this.weaveAdditiveExpression,
        MultiplicativeExpression: this.weaveMultiplicativeExpression,
        PrimaryExpression: this.weavePrimaryExpression,
        BooleanExpression: this.weaveBooleanExpression,
        Expression: this.weaveExpression,
    };
}
