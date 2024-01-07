import type { ValidationAcceptor, ValidationChecks } from 'langium';
import * as ClassAST from './visitor.js';
import { RoboMLVisitor } from './visitor.js';
import * as InterfaceAST from '../language/generated/ast.js';
import type { RobbotMlAstType } from '../language/generated/ast.js';
import { RobbotMlServices } from '../language/robbot-ml-module.js';

//import { RobbotMlServices } from '../language/robbot-ml-module.js';
// import type { RoboMlServices } from '../language/robo-ml-module.js';


/**
 * Register custom validation checks.
 * TODO : Call this function in the language module.ts file (see registerValidationChecks(...);)
 */
export function weaveAcceptMethods(services: RobbotMlServices) {
    const registry = services.validation.ValidationRegistry;
    const weaver = new RoboMlAcceptWeaver()
    registry.register(weaver.checks, weaver);
}

/**
 * TODO :
 * You must implement a weaving function for each concrete concept of the language.
 * you will also need to fill the check data structure to map the weaving function to the Type of node
 */
export class RoboMlAcceptWeaver {
    weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitProgram(node as ClassAST.Program);}
    }

    weaveFunctionML(node : InterfaceAST.FunctionML, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitFunctionML(node as ClassAST.FunctionML);}
    }

    weaveBlock(node : InterfaceAST.Block, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitBlock(node as ClassAST.Block);}
    }

    weaveAffectation(node : InterfaceAST.Affectation, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitAffectation(node as ClassAST.Affectation);}
    }

    weaveNumericExpression(node : InterfaceAST.NumericExpression, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitNumericExpression(node as ClassAST.NumericExpression);}
    }

    weaveInstruction(node : InterfaceAST.Instruction, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitInstruction(node as ClassAST.Instruction);}
    }

    weaveExpression(node : InterfaceAST.Expression, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitExpression(node as ClassAST.Expression);}
    }

    weaveSetSpeedCommad(node : InterfaceAST.SetSpeedCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitSetSpeedCommand(node as ClassAST.SetSpeedCommand);}
    }

    weaveCommad(node : InterfaceAST.Command, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitCommand(node as ClassAST.Command);}
    }

    weaveMovementCommad(node : InterfaceAST.MovementCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitMovementCommand(node as ClassAST.MovementCommand);}
    }

    weaveFunctionCall(node : InterfaceAST.FunctionCall, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitFunctionCall(node as ClassAST.FunctionCall);}
    }

    weaveVarialeDeclaration(node : InterfaceAST.VariableDeclaration, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitVariableDeclaration(node as ClassAST.VariableDeclaration);}
    }

    weaveLoopCommand(node : InterfaceAST.LoopCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitLoopCommand(node as ClassAST.LoopCommand);}
    }

    weaveClockwiseCommand(node : InterfaceAST.ClockwiseCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitClockwiseCommand(node as ClassAST.ClockwiseCommand);}
    }

    weaveForwardCommand(node : InterfaceAST.ForwardCommand, accept : ValidationAcceptor) : void{
        (<any> node).accept = (visitor: RoboMLVisitor) => {return visitor.visitForwardCommand(node as ClassAST.ForwardCommand);}
    }

    checks: ValidationChecks<RobbotMlAstType> = {
        Program : this.weaveProgram,
        FunctionML : this.weaveFunctionML,
        Block : this.weaveBlock,
        Affectation : this.weaveAffectation,
        Instruction : this.weaveInstruction,
        NumericExpression : this.weaveNumericExpression,
        Expression : this.weaveExpression,
        SetSpeedCommand : this.weaveSetSpeedCommad,
        Command : this.weaveCommad,
        MovementCommand : this.weaveMovementCommad,
        FunctionCall : this.weaveFunctionCall,
        VariableDeclaration : this.weaveVarialeDeclaration,
        LoopCommand : this.weaveLoopCommand,
        ClockwiseCommand : this.weaveClockwiseCommand,
        ForwardCommand : this.weaveForwardCommand
    };

}
