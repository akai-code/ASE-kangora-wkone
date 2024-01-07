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
