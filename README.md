# ASE-kangora-wkone (RoboML DSL)

## Overview

The ASE-kangora-wkone project is dedicated to crafting a Domain-Specific Language (DSL) for delineating the behavior of a small robot. This encompassing DSL endeavor spans domain modeling, intricate tooling implementation, featuring a text editor, an interpreter employing a web-based simulator, and a compiler generating Arduino code.

### Domain Modeling with Ecore

In the project's inaugural phase, we meticulously constructed the language's metamodel utilizing Ecore, offering a nuanced abstraction of the DSL's abstract syntax.

![RoboML Ecore Metamodel](./img/metamodel.jpeg)

#### 1. **Program:**
Represents the comprehensive structure of a RoboML program. It serves as the root element, orchestrating a collection of functions that collectively define the robot's behavior. Ensuring function names are unique, the entry point of the program is the `entry()` function.

#### 2. **FunctionML:**
Defines a function within the RoboML language. Functions encapsulate reusable units of behavior, equipped with parameters for receiving input values, a return type for specifying output, and a body containing a sequence of instructions.

#### 4. **Block:**
Contains an ensemble of instructions within a function, providing a structured way to organize the logic of a function.

#### 5. **Instruction:**
Represents a generic instruction within the RoboML language, constituting the fundamental building blocks that define the robot's behavior. Instructions include commands, variable declarations, and more.

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


## Textual Modeling with Langium

Après avoir défini la structure de notre langage sur Eclipse Modeling Framework (EMF),nous avons basculé sur visual studio code pour la partie éditeur de texte. Nous avons utilisé Langium, un framework qui permet de générer un éditeur de texte à partir d’un méta-modèle EMF. Il est basé sur le langage de programmation TypeScript et utilise le framework Xtext pour générer le code source de l’éditeur. Il permet de générer un éditeur de texte avec des fonctionnalités de coloration syntaxique, d’autocompletion, de validation et de navigation. Il permet aussi de générer un serveur LSP (Language Server Protocol) qui permet d’intégrer l’éditeur de texte avec d’autres IDEs comme Eclipse, Visual Studio Code, Atom, etc.

![RoboML Langium Grammar](./img/grammar.jpeg)


The second part focuses on defining the Langium grammar and editor for the DSL. We used the TypeScript-based Langium workbench to build a Visual Studio Code extension. This extension allows users to edit RoboML code with syntax highlighting and autocompletion.

### Interpreting RoboML Code

The interpreter is implemented in TypeScript and runs on a web-based simulator for the robot. It utilizes the visitor design pattern to traverse the Abstract Syntax Tree (AST) generated from parsed RoboML code. The interpreter simulates the robot's behavior according to the code.

### Compiling RoboML Code

The compiler translates RoboML code into Arduino code, enabling the robot to execute the specified behavior. Similar to the interpreter, the compiler uses the visitor pattern to traverse the AST and generate Arduino-compatible code.

## Demo

Watch a demo of the RoboML DSL project in action [here](link/to/demo/video).

## Summary and Challenges

In summary, this project involved creating a DSL for robot behavior, including domain modeling, textual modeling, interpretation, and compilation. Challenges encountered during development included...

- Challenge 1
- Challenge 2
- ...

Feel free to explore the project, try out the DSL, and contribute to its improvement!

**Note:** Add any specific instructions or additional details based on your project's unique aspects.
