grammar RobbotMl
import 'Terminals'
import 'robotMLFinal-types'


entry Program returns Program:
        (functions+=FunctionML)*
;

FunctionML returns FunctionML:
    'let' returnType=DataType name=ID '(' (parameters+=Parameter (',' parameters+=Parameter)*)? ')' '{'
        (body=Block)?
    '}'
;

Parameter returns Parameter:
    name=ID (':' type=DataType)?
;

Block returns Block:
    (instructions+=Instruction)*
;

Instruction returns Instruction:
    Command | VariableDeclaration | Affectation
;

Affectation returns Affectation:
    variable=ID '=' expression=NumericExpression
;

Command returns Command:
    MovementCommand | ControlCommand | GetTimestampCommand | GetDistanceCommand | FunctionCall
;

MovementCommand returns MovementCommand:
    ForwardCommand | ClockwiseCommand | SetSpeedCommand
;

ForwardCommand returns ForwardCommand:
    'Forward' distance=NumericExpression unit=UnitType
;

ClockwiseCommand returns ClockwiseCommand:
    'Clock' angle=NumericExpression
;

SetSpeedCommand returns SetSpeedCommand:
    'setSpeed' '(' speed=NumericExpression unit=UnitType ')'
;

ControlCommand returns ControlCommand:
    IfStatement | LoopCommand
;

IfStatement returns IfStatement:
    'if' '(' condition=BooleanExpression ')' '{' (ifBranch+=Instruction)* '}' 'else' '{' (elseBranch+=Instruction)* '}'
;

LoopCommand returns LoopCommand:
    'loop' variable=ID '<' limit=NumericExpression  '{' 
        (body+=Instruction)* 
    '}'
;

GetTimestampCommand returns GetTimestampCommand:
    'getTimestamp' '(' variable=VariableDeclaration ')'
;

GetDistanceCommand returns GetDistanceCommand:
    'getDistance' '(' variable=VariableDeclaration ')'
;

FunctionCall returns FunctionCall:
    functionName=ID '(' (arg+=Expression (',' arg+=Expression)*)? ')'
;

VariableDeclaration returns VariableDeclaration:
    'var' type=DataType name=ID '=' initialValue=INT
;

NumericExpression returns NumericExpression:
    AdditiveExpression
;

AdditiveExpression returns NumericExpression:
    MultiplicativeExpression (op=('+' | '-') right=MultiplicativeExpression)*
;

MultiplicativeExpression returns NumericExpression:
    PrimaryExpression (op=('*' | '/') right=PrimaryExpression)*
;

PrimaryExpression returns NumericExpression:
    INT | ID | FunctionCall | '(' NumericExpression ')'
;
BooleanExpression returns BooleanExpression:
    NumericExpression ('=='|'!='|'<'|'>'|'<='|'>=') NumericExpression
;

UnitType returns UnitType:
    'cm' | 'mm'
;


DataType returns DataType:
    'bool' | 'number' | 'void'
;

Expression returns Expression:
    NumericExpression | BooleanExpression | FunctionCall
;