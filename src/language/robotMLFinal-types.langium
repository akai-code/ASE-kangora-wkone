// robotMLFinal-types.langium

type DataType = 'bool' | 'number' | 'void';

type UnitType = 'cm' | 'mm';

type NumericOperator = '+' | '-' | '*' | '/';

interface NamedElement {
    name?: string;
}

interface Expression {
}

interface Program extends NamedElement {
    functions: FunctionML[];
}

interface FunctionML extends NamedElement {
    parameters: Parameter[];
    body: Block;
    returnType?: DataType;
}

interface Parameter extends NamedElement {
    type?: DataType;
}

interface Block extends NamedElement {
    instructions: Instruction[];
}

interface Instruction extends NamedElement {
}

interface Command extends Instruction {
}

interface MovementCommand extends Command {
    value?: Expression;
}

interface ControlCommand extends Instruction {
}

interface IfStatement extends NamedElement {
    condition: BooleanExpression;
    ifBranch: Instruction[];
    elseBranch: Instruction[];
}

interface LoopCommand extends NamedElement {
    variable: string;
    limit: NumericExpression;
    body: Instruction[];
}

interface GetTimestampCommand extends Instruction {
    variable: VariableDeclaration;
}

interface GetDistanceCommand extends Instruction {
    variable: VariableDeclaration;
}

interface ForwardCommand extends MovementCommand {
    distance: NumericExpression;
    unit: UnitType;
}

interface ClockwiseCommand extends MovementCommand {
    angle: NumericExpression;
}

interface FunctionCall extends Instruction {
    functionName: string;
    arg?: Expression[];
}

interface CustomCommand extends FunctionCall {
    body: Instruction[];
}

interface VariableDeclaration extends NamedElement {
    type?: DataType;
    initialValue: NumericExpression;
}

interface NumericExpression extends Expression {
    left?: NumericExpression;
    right?: NumericExpression;
    op?: NumericOperator;
}

interface SetSpeedCommand extends MovementCommand {
    speed: NumericExpression;
    unit: UnitType;
}

interface BooleanExpression extends Expression {
}

interface Affectation extends Instruction {
    variable: string;
    expression: NumericExpression;
}

interface ID extends NamedElement {
    value: string;
}

interface AdditiveExpression extends NumericExpression {
}

interface MultiplicativeExpression extends NumericExpression {
}

interface PrimaryExpression extends NumericExpression {
}