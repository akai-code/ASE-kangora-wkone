# ASE-kangora-wkone ( RoboML DSL)

## Overview

This project involves creating a Domain-Specific Language (DSL) for defining the behavior of a small robot. The DSL includes modeling the domain, implementing tooling such as a text editor, an interpreter (for a web-based simulator), and a compiler (for Arduino code).

### Domain Modeling with Ecore

In the first part of the project, we defined the language's metamodel using Ecore, which captures the abstract syntax of the DSL. The key concepts modeled include:

#### 1. **Program:**
   - **Description:** Represents the overall structure of a RobbotML program.
   - **Explanation:** A program consists of a set of functions that define the behavior of the robot. It serves as the root element of the language.

#### 2. **FunctionML:**
   - **Description:** Defines a function within the RobbotML language.
   - **Explanation:** Functions encapsulate reusable units of behavior. They include parameters, a return type, and a body containing a sequence of instructions.

#### 3. **Parameter:**
   - **Description:** Represents a parameter within a function definition.
   - **Explanation:** Parameters allow functions to receive input values, enhancing flexibility and reusability.

#### 4. **Block:**
   - **Description:** Defines a block of instructions within a function.
   - **Explanation:** A block groups multiple instructions together, providing a structured way to organize the logic of a function.

#### 5. **Instruction:**
   - **Description:** Represents a generic instruction within the RobbotML language.
   - **Explanation:** Instructions are the fundamental building blocks that define the behavior of the robot. They include commands, variable declarations, and assignments.

#### 6. **Affectation:**
   - **Description:** Represents an assignment operation within an instruction.
   - **Explanation:** Assigns a value to a variable, enabling the manipulation and storage of data during program execution.

#### 7. **Command:**
   - **Description:** Represents a command that controls the robot's movements or performs specific actions.
   - **Explanation:** Commands are essential for directing the robot's behavior. They include movement commands, control commands, and function calls.

#### 8. **MovementCommand:**
   - **Description:** Defines commands related to the robot's movement.
   - **Explanation:** Movement commands control the robot's translational and rotational motion.

#### 9. **ControlCommand:**
   - **Description:** Represents control flow commands such as if statements and loop commands.
   - **Explanation:** Control commands manage the flow of execution based on specified conditions or loops.

#### 10. **IfStatement:**
   - **Description:** Represents an if statement within the control flow.
   - **Explanation:** Allows conditional execution of a block of instructions based on a specified boolean condition.

#### 11. **LoopCommand:**
   - **Description:** Represents a loop statement within the control flow.
   - **Explanation:** Executes a block of instructions repeatedly as long as a specified condition holds true.

#### 12. **GetTimestampCommand:**
   - **Description:** Retrieves the timestamp and assigns it to a variable.
   - **Explanation:** Useful for time-related operations within the program.

#### 13. **GetDistanceCommand:**
   - **Description:** Retrieves the distance and assigns it to a variable.
   - **Explanation:** Enables the robot to measure and use distances in its computations.

#### 14. **FunctionCall:**
   - **Description:** Represents a call to another function within the program.
   - **Explanation:** Enables the reuse of code by invoking the behavior defined in other functions.

#### 15. **VariableDeclaration:**
   - **Description:** Declares a variable within the program.
   - **Explanation:** Variables are used for storing and managing data during program execution.

#### 16. **NumericExpression:**
   - **Description:** Represents expressions involving numeric values.
   - **Explanation:** Numeric expressions are fundamental for mathematical operations within the language.

#### 17. **BooleanExpression:**
   - **Description:** Represents expressions involving boolean values.
   - **Explanation:** Enables conditional branching and logical operations within the program.

#### 18. **UnitType:**
   - **Description:** Defines the unit type for distance measurements.
   - **Explanation:** Provides a standardized way to represent units such as centimeters (cm) or millimeters (mm).

#### 19. **DataType:**
   - **Description:** Represents data types such as boolean, number, or void.
   - **Explanation:** Specifies the type of data associated with variables, function return values, and parameters.

#### 20. **Expression:**
   - **Description:** Represents a generic expression within the RobbotML language.
   - **Explanation:** Expressions are used to define computations, whether numeric, boolean, or function calls.

The careful definition of these concepts in the metamodel allows for a clear and concise representation of the abstract syntax of RobbotML, fostering readability, maintainability, and extensibility of the DSL.
.

Below is the Ecore metamodel:

![RoboML Ecore Metamodel](./img/metamodel.jpeg)

In this metamodel, classes such as `Movement`, `Rotation`, `Speed`, `Sensors`, etc., capture the essential concepts of the RoboML language.

## Textual Modeling with Langium

The second part focuses on defining the Langium grammar and editor for the DSL. We used the TypeScript-based Langium workbench to build a Visual Studio Code extension. This extension allows users to edit RoboML code with syntax highlighting and autocompletion.

### Interpreting RoboML Code

The interpreter is implemented in TypeScript and runs on a web-based simulator for the robot. It utilizes the visitor design pattern to traverse the Abstract Syntax Tree (AST) generated from parsed RoboML code. The interpreter simulates the robot's behavior according to the code.

### Compiling RoboML Code

#### Overview

The compilator translates RoboML code into Arduino code, enabling the robot to execute the specified behavior.
This compiler solves the following problems :
* Reduce the complexity of expressing programs for our robot because this language is easily manipulable by humans compared to  c-arduino code
* Have c-arduino code optimized for our robots. Indeed, it is not easy for non-specialists to write optimized code in low-level languages.

#### Principle of implementation

##### pattern visitor

![Texte alternatif](Visitor.png)

The visitor pattern is a pattern that allows you to separate the data structure and the algorithm that will be applied to it. Thus we separate the concerns of evolution of the data structure and the algorithm. Each of the two entities can evolve independently without impacting each other.
In practice, the implementation of the visitor pattern involves two entities:
* classes to visit: these are the data structures (classes) on which algorithms must be applied. In principle of OOP, the algorithms are supposed to be found in these classes directly and in this case the evolution of the algorithms implies the modification of the classes (which we precisely want to avoid because the classes are often closed it is to say not accessible to the algorithm developer)
* the visitor interface: which allows you to define the methods of visiting each given structure. These are the methods which will contain the algorithms to be applied to each data structure.
The interface allows you to decouple methods from their implementation. This allows implementations to evolve without regression on classes that use the interface that defines the methods.
* the concrete visitor: it is an implementation of the visitor interface which will make it possible to give an implementation of each visit method.

##### class extention
Class extension allows you to add a new method to an object dynamically (without adding the method at the object class level).
This can be used to add a new method to an object of a closed class (a class whose code we cannot access) or a class whose code we do not want to modify.

##### Setting up the visitor pattern for our compiler

![Texte alternatif](pattern_apply.png)

In the context of our compiler, the data structures or classes to be visited are the different concepts of our class.
In the visitor interface we define the visit methods for each concept. In concrete visitors, we give an implementation of these methods which translates the concept visit into its equivalent concept of the c-arduino language.
Concept classes are generated by languim automatically. which means that these classes are closed for us. We therefore use the class extension mechanism to dynamically add accept(visitor) to these concept classes.
##### Illustrative diagram of the traversal of our abstract syntax tree

![Texte alternatif](parcours_diagram.png)

We start by translating our robotML program code into AST (abstract syntax tree) whose nodes are the different concepts of our robotML languages.
then we call the ast.accept(visitor) method on the first node.
As a result, this accept(visitor) method brings us back to the visitConcretNode(ConcretNode) method.
In this method we execute the translation of the concreteNode. This translation process call the accept(visitor) method on all the child nodes of the ConcreteNode node.
So from the first node all nodes are visited recursively.

#### Resultats

##### Files containing compiler implementations

* src/semantics/visitor.ts which contains :
the declaration of our visitor interface :

```node
export interface RoboMLVisitor {
    visitProgram(node: ASTInterfaces.Program): any;
    visitFunctionML(node: ASTInterfaces.FunctionML): any;
   ...
}
```

l'implementation des classe concretes des concepts:
```node
export class Program implements ASTInterfaces.Program {  
   ...
}
...
//
export class FunctionML implements ASTInterfaces.FunctionML{
   ...
}
```

* src/semantics/compiler.ts which contains :
The implementation of robotML visitor for compilation:
```node
export class ConcreteVisite implements RoboMLVisitor{
    //ici je dois implementer toute les methodes de l'interface roboMLVisitor
    visitProgram(node: Program): any {
      ...
   }
   ...
}
```
* src/semantics/accept-weaver.ts:
contains the accept-weaving class which is the class that extend concepts class to add the accept method dynamically
```node
 */
export class RoboMlAcceptWeaver {
    weaveProgram(node : InterfaceAST.Program, accept : ValidationAcceptor) : void{
      ...
      }
    weaveFunctionML(node : InterfaceAST.FunctionML, accept : ValidationAcceptor) :void{ 
      ...
    }
   ...
    checks: ValidationChecks<RobbotMlAstType> = {
        Program : this.weaveProgram,
        FunctionML : this.weaveFunctionML,
         ...
      }
   }

```
* src/cli/main.ts 
this file contains our main function in which we start the compilation by reading the robotML file :
```node
//Fonction that parseAndCompile the robotMLcode code to c arduino code
export const parseAndCompile = async (fileName: string): Promise<void> => {

    const services = createRobbotMlServices(NodeFileSystem).RobbotMl;
    const ast = await extractAstNode<Program>("program.rob",services) ;
    const visite = new ConcreteVisite() ;
    let compilation_result = ast.accept(visite);
    //
    writeInFile("./CompilationOutput/compiled_robot_code",compilation_result) ;
};
```

##### Unfinished StitchesPoints non terminés

- We have fixed the name of the program to compile in the main function because of an error encountered at this level. Later this file will be passed to the command prompt when calling the compiler
- We also fixed the compilation result of ASE-KANGORA-WKONE/CompilationOutput/compiled_robot_code.c
- We have put a stub at the level of the numerical expression concepts because we cannot recover the constant value when the numerical expression is a constant at this stage

## Demo

#### Compilator

- The robotML program to compile:
```
let void entry () {
    setSpeed(150 mm)
    var number count = 0
    loop count < 5
    {	
        count = count + 1
        square()
    }
}

let void square(){
    Forward 30 cm
    Clock 90
    Forward 300 mm
    Clock 90
    Forward 30 cm
    Clock 90
    Forward 300 mm
    Clock 90
}
```
- Executing the compilation
```
wke@P204linux:~/Bureau/Scool_Project/ASE-kangora-wkone$ ./compile.sh 
**********************Building****************************

> robbot-ml@0.0.1 build
> tsc -b tsconfig.json && node esbuild.mjs

[01:56:28] Build succeeded
**********************Generating the binary of compilation function****************************
[sudo] Mot de passe de wke : 

> robbot-ml@0.0.1 langium:generate
> langium generate

Reading config from langium-config.json
src/language/Terminals.langium:2:34 - Consider using regex instead of character ranges
src/language/Terminals.langium:2:46 - Consider using regex instead of character ranges
src/language/Terminals.langium:2:64 - Consider using regex instead of character ranges
src/language/Terminals.langium:2:76 - Consider using regex instead of character ranges
src/language/Terminals.langium:2:94 - Consider using regex instead of character ranges
src/language/Terminals.langium:3:29 - Consider using regex instead of character ranges
Writing generated files to /home/wke/Bureau/Scool_Project/ASE-kangora-wkone/src/language/generated
Writing textmate grammar to /home/wke/Bureau/Scool_Project/ASE-kangora-wkone/syntaxes/robbot-ml.tmLanguage.json
Writing monarch grammar to /home/wke/Bureau/Scool_Project/ASE-kangora-wkone/syntaxes/robbot-ml.monarch.ts
Langium generator finished successfully in 175ms
**********************Compilation Result****************************
**visiting Program**
**visiting FunctionML entry**
**visiting block**
**visiting MovementCommand SetSpeedCommand ***
**visiting SetSpeedCommand ***
**visiting variable declararion ***
**visiting Expression NumericExpression***
**visiting LoopCommand ***
**visiting Expression NumericExpression***
**visiting instruction Affectation ***
**visiting Affectation ***
**visiting FunctionCall square ***
**visiting FunctionML square**
**visiting block**
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
**visiting Expression NumericExpression***
```
- The compilation result
```c
//----------compiling robot code to c arduino code result----------

#include <PinChangeInt.h>
#include <PinChangeIntConfig.h>
#include <EEPROM.h>
#define _NAMIKI_MOTOR    //for Namiki 22CL-103501PG80:1
#include <fuzzy_table.h>
#include <PID_Beta6.h>
#include <MotorWheel.h>
#include <Omni4WD.h>

//#include <fuzzy_table.h>
//#include <PID_Beta6.h>

/*

            \                    /
   wheel1   \                    /   wheel4
   Left     \                    /   Right


                              power switch

            /                    \
   wheel2   /                    \   wheel3
   Right    /                    \   Left

*/

/*
  irqISR(irq1,isr1);
  MotorWheel wheel1(5,4,12,13,&irq1);

  irqISR(irq2,isr2);
  MotorWheel wheel2(6,7,14,15,&irq2);

  irqISR(irq3,isr3);
  MotorWheel wheel3(9,8,16,17,&irq3);

  irqISR(irq4,isr4);
  MotorWheel wheel4(10,11,18,19,&irq4);
*/

irqISR(irq1, isr1);
MotorWheel wheel1(3, 2, 4, 5, &irq1);

irqISR(irq2, isr2);
MotorWheel wheel2(11, 12, 14, 15, &irq2);

irqISR(irq3, isr3);
MotorWheel wheel3(9, 8, 16, 17, &irq3);

irqISR(irq4, isr4);
MotorWheel wheel4(10, 7, 18, 19, &irq4);


Omni4WD Omni(&wheel1, &wheel2, &wheel3, &wheel4);

void setup() {
  //TCCR0B=TCCR0B&0xf8|0x01;    // warning!! it will change millis()
  TCCR1B = TCCR1B & 0xf8 | 0x01; // Pin9,Pin10 PWM 31250Hz
  TCCR2B = TCCR2B & 0xf8 | 0x01; // Pin3,Pin11 PWM 31250Hz

  Omni.PIDEnable(0.31, 0.01, 0, 10);
}

void loop() {
  Omni.demoActions(30,1500,500,false);

}


void main(){

  setSpeedMMPS(2 mm);
  number count = 35;
  while(count<=35){
      count=2;;
      square();
    };
};

void square(){

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,0,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,1,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,0,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,1,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,0,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,1,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,0,time);

  int speed = getSpeedMMPS() ;
  float distance = 35;
  unsign int time =  distance/speed ;
  runTime(speed,1,time);

};
```
#### Interpretor
Watch a demo of the RoboML DSL project in action [here](link/to/demo/video).

## Summary and Challenges

In summary, this project involved creating a DSL for robot behavior, including domain modeling, textual modeling, interpretation, and compilation. Challenges encountered during development included...

#### Compilator
We have face a lot of challence in the developpement of the compilator:

- The understanding of the visitor pattern which was very vague for us at the beginning but the project allowed us to understand its implementation and the problems to which it responds in particular the implementation of algorithms on closed classes (class to which we do not have access to code)
- The traversal of our Abstract Syntax Tree (AST) with the Visitor pattern involved contemplating where to start and how to navigate the tree. We realized that each node in the tree has its subnodes and requires the translation of its subnodes to obtain its own translation. This insight allowed us to establish the tree traversal model."
- We faced other challenges such as correcting circularity errors where the program loops between Node.accept(visitor) and visitor.visitCroncreteNode(Node)

#### Interpretor
- Challenge 1
- Challenge 2
- ...

Feel free to explore the project, try out the DSL, and contribute to its improvement!

**Note:** Add any specific instructions or additional details based on your project's unique aspects.
