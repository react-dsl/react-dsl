import { DSLInterpreter } from './Interpreter';
import { DSLLexer, tokenArray } from './Lexer';
import { DSLParser } from './Parser';

import { Cache } from '../cache/Cache';
import { Methods } from '../components/DslProvider';

export class DSL {

    private parser = new DSLParser(tokenArray, { outputCst: true }) as any;

    private interpreter = new DSLInterpreter();

    constructor(
        private cache: Cache,
        private prefix: string,
        private methods: Methods,
    ) {}

    calculate(state: any, text: string): any {
        const { methods } = this;
        return this.shouldCalculate(text)
            ? this.getCompiled(text)(state, methods)
            : text;
    }

    private getCompiled(text: string): any {
        const { cache, prefix } = this;
        const expression = prefix
            ? text.slice(prefix.length)
            : text;
        if (cache.has(expression)) {
            return cache.get(expression);
        } else {
            const compiled = this.compile(expression);
            cache.set(expression, compiled);
            return compiled;
        }
    }

    private shouldCalculate(value: any): boolean {
        const { prefix } = this;
        return typeof value === 'string' && (!prefix || value.startsWith(prefix));
    }

    private compile(expression: string): any {
        const cst = this.makeCst(expression);
        return (state, methods) => {
            const interpreter = this.interpreter.$withState(state).$withMethods(methods) as any;
            return interpreter.visit(cst);
        };
    }

    private makeCst(inputText) {
        const lexResult = DSLLexer.tokenize(inputText);
        this.parser.input = lexResult.tokens;
        const cst = this.parser.expression();
        if (this.parser.errors.length > 0) {
            throw Error('Parsing errors detected!\n' + this.parser.errors[0].message);
        }
        return cst;
    }
}
