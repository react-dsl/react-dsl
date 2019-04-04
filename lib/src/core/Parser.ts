import { Parser } from 'chevrotain';

import { tokens } from './Lexer';

export class DSLParser extends Parser {

    constructor(tokenArray, options) {
        super(tokenArray, options);
        const $ = this as any;
        $.RULE('expression', () => {
            $.SUBRULE($.booleanExpression);
        });
        $.RULE('booleanExpression', () => {
            $.SUBRULE($.comparisonExpression, { LABEL: 'lhs' });
            $.MANY(() => {
                $.CONSUME(tokens.BooleanOperator);
                $.SUBRULE2($.comparisonExpression, { LABEL: 'rhs' });
            });
        });
        $.RULE('comparisonExpression', () => {
            $.SUBRULE($.additionExpression, { LABEL: 'lhs' });
            $.MANY(() => {
                $.CONSUME(tokens.ComparisonOperator);
                $.SUBRULE2($.additionExpression, { LABEL: 'rhs' });
            });
        });
        $.RULE('additionExpression', () => {
            $.SUBRULE($.multiplicationExpression, { LABEL: 'lhs' });
            $.MANY(() => {
                $.CONSUME(tokens.AdditionOperator);
                $.SUBRULE2($.multiplicationExpression, { LABEL: 'rhs' });
            });
        });
        $.RULE('multiplicationExpression', () => {
            $.SUBRULE($.atomicExpression, { LABEL: 'lhs' });
            $.MANY(() => {
                $.CONSUME(tokens.MultiplicationOperator);
                $.SUBRULE2($.atomicExpression, { LABEL: 'rhs' });
            });
        });
        $.RULE('atomicExpression', () => $.OR([
            { ALT: () => $.CONSUME(tokens.NumberLiteral) },
            { ALT: () => $.CONSUME(tokens.StringLiteral) },
            { ALT: () => $.SUBRULE($.parenthesisExpression) },
            { ALT: () => $.SUBRULE($.functionExpression) },
        ]));
        $.RULE('parenthesisExpression', () => {
            $.CONSUME(tokens.LParen);
            $.SUBRULE($.expression);
            $.CONSUME(tokens.RParen);
        });
        $.RULE('functionExpression', () => {
            $.CONSUME(tokens.NameLiteral);
            $.CONSUME(tokens.LParen);
            $.SUBRULE($.expression, { LABEL: 'first' });
            $.MANY(() => {
                $.CONSUME(tokens.Comma);
                $.SUBRULE2($.expression, { LABEL: 'rest' });
            });
            $.CONSUME(tokens.RParen);
        });
        this.performSelfAnalysis();
    }
}
