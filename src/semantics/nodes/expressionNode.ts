import * as ASTInterface from '../../language/generated/ast.js';
import { AstNode, CstNode, LangiumDocument } from 'langium';
import { RoboMLVisitor} from '../visitor.js';

export class ExpressionNode implements ASTInterface.Expression {
    constructor(public $type: 'AdditiveExpression' | 'BooleanExpression' | 'Expression' | 'MultiplicativeExpression' | 'NumericExpression' | 'PrimaryExpression') {}
    $container?: AstNode | undefined;
    $containerProperty?: string | undefined;
    $containerIndex?: number | undefined;
    $cstNode?: CstNode | undefined;
    $document?: LangiumDocument<AstNode> | undefined;
    accept(visitor: RoboMLVisitor): any {}
}