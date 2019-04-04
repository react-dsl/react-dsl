import { ICstVisitor, tokenMatcher } from 'chevrotain';

import { tokenArray, tokens } from './Lexer';
import { DSLParser } from './Parser';

const parser = new DSLParser(tokenArray, {});

const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

export class DSLInterpreter extends BaseCstVisitor implements ICstVisitor<any, any> {

    private state: any;

    private methods: Record<string, (...args: any[]) => any>;

    constructor() {
        super();
        this.validateVisitor();
    }

    $withState(state: any) {
        this.state = state;
        return this;
    }

    $withMethods(methods: Record<string, (...args: any[]) => any>) {
        this.methods = methods;
        return this;
    }

    expression(ctx) {
        return this.visit(ctx.booleanExpression);
    }

    booleanExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, idx) => {
                const rhsValue = this.visit(rhsOperand);
                const operator = ctx.BooleanOperator[idx];
                if (tokenMatcher(operator, tokens.And)) {
                    result = result && rhsValue;
                } else {
                    result = result || rhsValue;
                }
            });
        }
        return result;
    }

    comparisonExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, idx) => {
                const rhsValue = this.visit(rhsOperand);
                const operator = ctx.ComparisonOperator[idx];
                if (tokenMatcher(operator, tokens.Equal)) {
                    result = result === rhsValue;
                } else if (tokenMatcher(operator, tokens.NotEqual)) {
                    result = result !== rhsValue;
                } else if (tokenMatcher(operator, tokens.LessThan)) {
                    result = result < rhsValue;
                } else if (tokenMatcher(operator, tokens.LessOrEqual)) {
                    result = result <= rhsValue;
                } else if (tokenMatcher(operator, tokens.GreaterThan)) {
                    result = result > rhsValue;
                } else if (tokenMatcher(operator, tokens.GreaterOrEqual)) {
                    result = result >= rhsValue;
                } else {
                    throw new Error();
                }
            });
        }
        return result;
    }

    additionExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, idx) => {
                const rhsValue = this.visit(rhsOperand);
                const operator = ctx.AdditionOperator[idx];
                if (tokenMatcher(operator, tokens.Plus)) {
                    result += rhsValue;
                } else {
                    result -= rhsValue;
                }
            });
        }
        return result;
    }

    multiplicationExpression(ctx) {
        let result = this.visit(ctx.lhs);
        if (ctx.rhs) {
            ctx.rhs.forEach((rhsOperand, idx) => {
                const rhsValue = this.visit(rhsOperand);
                const operator = ctx.MultiplicationOperator[idx];
                if (tokenMatcher(operator, tokens.Multi)) {
                    result *= rhsValue;
                } else {
                    result /= rhsValue;
                }
            });
        }
        return result;
    }

    atomicExpression(ctx) {
        if (ctx.parenthesisExpression) {
            return this.visit(ctx.parenthesisExpression);
        } else if (ctx.NumberLiteral) {
            return parseInt(ctx.NumberLiteral[0].image, 10);
        } else if (ctx.StringLiteral) {
            return ctx.StringLiteral[0].image.slice(1, -1);
        } else if (ctx.functionExpression) {
            return this.visit(ctx.functionExpression);
        }
    }

    parenthesisExpression(ctx) {
        return this.visit(ctx.expression);
    }

    functionExpression(ctx) {
        const { image } = ctx.NameLiteral[0];
        const first = this.visit(ctx.first);
        const rest = (ctx.rest || []).map(a => this.visit(a));
        return this.methods[image].apply(this.state, [first, ...rest]);
    }
}
