// import { Program } from "../language/generated/ast.js";
import { readFileSync } from "fs";
import { Affectation, Block, ClockwiseCommand, Command, Expression, ForwardCommand, FunctionCall, FunctionML, Instruction, LoopCommand, MovementCommand, NumericExpression, Program, RoboMLVisitor, SetSpeedCommand, VariableDeclaration } from "./visitor.js";
import { PrimaryExpression } from "../language/generated/ast.js";
//import { Interface } from "readline";
//import { isSetSpeedCommand } from "../language/generated/ast.js";
//import { Block } from "../language/generated/ast.js";
import * as ASTInterfaces from '../language/generated/ast.js';


export class ConcreteVisite implements RoboMLVisitor{

    //ici je dois implementer toute les methodes de l'interface roboMLVisitor
    visitProgram(node: Program): any {

        console.log("**visiting Program**");
        // extract the base code code of c arduino code
        var arduinoBaseCode = "";
        var fileWithArduinoBaseCode = "src/compiler/Arduino Example/program/RB0021_Omni4WD_PID/RB0021_Omni4WD_PID.ino";
        readFileSync(fileWithArduinoBaseCode, 'utf8').split(/\r?\n/).forEach(function (line) {
            arduinoBaseCode = arduinoBaseCode.concat(line + "\n");
        });

        //compile the robotMlcode
        var compilingCode = "" ;

        //visite all the node function in the node programme
        node.functions.forEach((element) => {
            compilingCode = compilingCode.concat(element.accept(this)+"\n") ;
        })

        //var compiledCode = arduinoBaseCode.concat(compilingCode) ;
        console.log("\n----------compiling robot code to c arduino code result----------\n");
        
        let compiledCode = arduinoBaseCode.concat("\n"+compilingCode);

        console.log(compiledCode) ;
        return(compiledCode);

    }

    //
    visitFunctionML(node: FunctionML): any {
        console.log("**visiting FunctionML "+ node.name +"**")
        
        let params = "" ;
        let functionName = node.name ;
        if(functionName=='entry'){
            functionName = 'main'
        }

        let result = node.returnType + " " + functionName + "(" + params + ")" + node.body.accept(this);

        return(result.concat("\n"));
    }

    //

    visitBlock(node: Block): any{
        console.log("**visiting block**") ;
        let ptr = "{\n" ;
        ptr = ptr.concat("\n");
        node.instructions.forEach((element) =>{
            ptr = ptr.concat( element.accept(this)+ "\n" );
        })

        return(ptr.concat("};")) ;
    }

    //
    visitInstruction(node: Instruction): any{

        console.log("**visiting instruction "+node.$type+" ***");
        if(node.$type=='Affectation'){
            let affectnode = node as Affectation ;
            return this.visitAffectation(affectnode);
        }
        return node.$type;
    }

    //
    visitAffectation(node: Affectation): any{
        console.log("**visiting Affectation ***");
        return "    "+ node.variable + "=" + 2+";";
    }

    //
    visitExpression(node: Expression): any{
        console.log("**visiting Expression "+node.$type+"***");
        if(node.$type=='NumericExpression'){
            //console.log("--ok--") ;
            //let numericExpressionNode = node as NumericExpression ;
            //this.visitNumericExpression(numericExpressionNode);
            return(35);
        }
        if(node.$type=='PrimaryExpression'){
            let PrimaryExpressionNode = node as PrimaryExpression;
            PrimaryExpressionNode as unknown as ASTInterfaces.ID ;
            return(25);
        }
        return(35);

    }

    //
    visitNumericExpression(node: NumericExpression): any{

        console.log("**visiting NumericExpression "+node.$type+" ***");

        if(node.$type=='AdditiveExpression'){
            return("("+node.left?.accept(this)+""+node.op+""+node.right?.accept(this)+")")
        }

        if(node.$type=='MultiplicativeExpression'){
            return("("+node.left?.accept(this)+""+node.op+""+node.right?.accept(this)+")")
        }

        if(node.$type=='NumericExpression'){
            return(5);
        }

        return(40);
    }

    //
    visitSetSpeedCommand(node: SetSpeedCommand): any{
        console.log("**visiting SetSpeedCommand ***");
        if(node.unit=='cm'){
            //setSpeedMMPS(int mm);
            return "  setSpeedCMPM(" +2+ " "+node.unit+ ");";
        }
        if(node.unit=='mm'){
            return "  setSpeedMMPS(" +2+ " "+node.unit+ ");";
        }
    }

    //
    visitCommand(node: Command): any{
        console.log("**visiting Command ***");
        node.accept(this) ;
    }

    //
    visitMovementCommand(node: MovementCommand): any{

        console.log("**visiting MovementCommand "+ node.$type +" ***");

        if(node.$type=='SetSpeedCommand'){

            let node_setspeed = (node as SetSpeedCommand) ;

            return(this.visitSetSpeedCommand(node_setspeed));
         }
         

        if(node.$type=='ClockwiseCommand'){

            let node_clockwise = (node as unknown as ClockwiseCommand) ;

            return(this.visitClockwiseCommand(node_clockwise));
         }


         if(node.$type=='ForwardCommand'){

            let node_forward = (node as ForwardCommand) ;

            return(this.visitForwardCommand(node_forward));
         }

        return "steb movement commande" ;
    }

    //
    visitFunctionCall(node: FunctionCall): any{

        console.log("**visiting FunctionCall "+ node.functionName +" ***");

        let ptr = "";
        node.arg.forEach((argument) =>{
            ptr=ptr.concat(argument.accept(this));
        })

        return("    "+node.functionName+"("+ptr+")");
        
    }

    //
    visitVariableDeclaration(node: VariableDeclaration): any{
        console.log("**visiting variable declararion ***");
        return("  "+ node.type + " " + node.name + " = " + node.initialValue.accept(this)+";") ;
    }

    //
    visitLoopCommand(node: LoopCommand): any{
        console.log("**visiting LoopCommand ***");
        let ptr = "" ;
        ptr = ptr.concat("  while("+node.variable+"<="+node.limit.accept(this)+"){\n") ;
        node.body.forEach((bodyInstruction) =>{
            ptr = ptr.concat("  "+bodyInstruction.accept(this)+";\n");
        })
        ptr = ptr.concat("    };");
        return(ptr);
    }

    //
    visitForwardCommand(node: ForwardCommand): any{
        // let ptr = "runTime(unsigned int speedMMPS,bool dir,unsigned int TimeMS)";
        let ptr = "";
        ptr = ptr.concat("  int speed = getSpeedMMPS() ;\n") ;
        ptr = ptr.concat("  float distance = "+node.distance.accept(this)+";\n") ;
        ptr = ptr.concat("  unsign int time =  distance/speed ;\n") ;
        ptr = ptr.concat("  runTime(speed,0,time);\n") ;
        return(ptr);
    }

    //
    visitClockwiseCommand(node: ClockwiseCommand): any{

        let ptr = "";
        ptr = ptr.concat("  int speed = getSpeedMMPS() ;\n") ;
        ptr = ptr.concat("  float distance = "+node.angle.accept(this)+";\n") ;
        ptr = ptr.concat("  unsign int time =  distance/speed ;\n") ;
        ptr = ptr.concat("  runTime(speed,1,time);\n") ;
        return(ptr);
    }

}
