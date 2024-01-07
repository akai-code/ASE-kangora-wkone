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
        // Logique pour s'assurer que le type correspond
        // ...
    }

    ensureLength(node: AstNode, length: number, index: any): void {
        // Logique pour s'assurer que la longueur est correcte
        // ...
    }

    getCurrentContext() {
        return this.ctx[this.ctx.length - 1];
    }

    getVariable(name: string) {
        // Logique pour récupérer la variable dans le contexte
        // ...
    }

    setVariable(name: string, value: any) {
        // Logique pour définir la variable dans le contexte
        // ...
    }

    setListValue(name: string, value: any, index: number) {
        // Logique pour définir la valeur dans la liste dans le contexte
        // ...
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
        // Logique pour interpréter une commande de boucle
        // ...
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
        // Logique pour interpréter une déclaration de variable
        // ...
    }

    visitFunctionCall(node: FunctionCall): any {
        // Logique pour interpréter un appel de fonction
        // ...
    }

    visitExpression(node: Expression): any {
        // Logique pour interpréter une expression
        // ...
    }

    visitNumericExpression(node: NumericExpression): any {
        // Logique pour interpréter une expression numérique
        // ...
    }

    visitAdditiveExpression(node: AdditiveExpression): any {
        // Logique pour interpréter une expression additive
        // ...
    }

    visitMultiplicativeExpression(node: MultiplicativeExpression): any {
        // Logique pour interpréter une expression multiplicative
        // ...
    }

    visitPrimaryExpression(node: PrimaryExpression): any {
        // Logique pour interpréter une expression primaire
        // ...
    }

    visitBooleanExpression(node: BooleanExpression): any {
        // Logique pour interpréter une expression booléenne
        // ...
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