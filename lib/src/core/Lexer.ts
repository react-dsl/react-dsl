import { createToken, Lexer } from 'chevrotain';

const BooleanOperator = createToken({
    name: 'BooleanOperator',
    pattern: Lexer.NA,
});

const And = createToken({
    name: 'And',
    pattern: /\&\&/,
    categories: BooleanOperator,
});

const Or = createToken({
    name: 'Or',
    pattern: /\|\|/,
    categories: BooleanOperator,
});

const ComparisonOperator = createToken({
    name: 'ComparisonOperator',
    pattern: Lexer.NA,
});

const Equal = createToken({
    name: 'Equal',
    pattern: /\=\=/,
    categories: ComparisonOperator,
});

const NotEqual = createToken({
    name: 'NotEqual',
    pattern: /\!\=/,
    categories: ComparisonOperator,
});

const LessThan = createToken({
    name: 'LessThan',
    pattern: /\</,
    categories: ComparisonOperator,
});

const GreaterThan = createToken({
    name: 'GreaterThan',
    pattern: /\>/,
    categories: ComparisonOperator,
});

const LessOrEqual = createToken({
    name: 'LessOrEqual',
    pattern: /\<\=/,
    categories: ComparisonOperator,
});

const GreaterOrEqual = createToken({
    name: 'GreaterOrEqual',
    pattern: /\>\=/,
    categories: ComparisonOperator,
});

const AdditionOperator = createToken({
    name: 'AdditionOperator',
    pattern: Lexer.NA,
});

const Plus = createToken({
    name: 'Plus',
    pattern: /\+/,
    categories: AdditionOperator,
});

const Minus = createToken({
    name: 'Minus',
    pattern: /\-/,
    categories: AdditionOperator,
});

const MultiplicationOperator = createToken({
    name: 'MultiplicationOperator',
    pattern: Lexer.NA,
});

const Multi = createToken({
    name: 'Multi',
    pattern: /\*/,
    categories: MultiplicationOperator,
});

const Div = createToken({
    name: 'Div',
    pattern: /\//,
    categories: MultiplicationOperator,
});

const Remainder = createToken({
    name: 'Remainder',
    pattern: /\%/,
    categories: MultiplicationOperator,
});

const Comma = createToken({
    name: 'Comma',
    pattern: /\,/,
});

const QuestionMark = createToken({
    name: 'QuestionMark',
    pattern: /\?/,
});

const Colon = createToken({
    name: 'Colon',
    pattern: /\:/,
});

const LParen = createToken({
    name: 'LParen',
    pattern: /\(/,
});

const RParen = createToken({
    name: 'RParen',
    pattern: /\)/,
});

const NameLiteral = createToken({
    name: 'NameLiteral',
    pattern: /[a-zA-Z_\$][\w\$]*/,
});

const NumberLiteral = createToken({
    name: 'NumberLiteral',
    pattern: /0|([1-9]\d*)/,
});

const StringLiteral = createToken({
    name: 'StringLiteral',
    pattern: /".*?"/,
});

const WhiteSpace = createToken({
    name: 'WhiteSpace',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

export const tokens = {
    AdditionOperator,
    And,
    BooleanOperator,
    Colon,
    Comma,
    ComparisonOperator,
    Div,
    Equal,
    GreaterOrEqual,
    GreaterThan,
    LessOrEqual,
    LessThan,
    LParen,
    Minus,
    Multi,
    MultiplicationOperator,
    NameLiteral,
    NotEqual,
    NumberLiteral,
    Or,
    Plus,
    QuestionMark,
    Remainder,
    RParen,
    StringLiteral,
    WhiteSpace,
};

export const tokenArray = Object.keys(tokens).map(key => tokens[key]);

export const DSLLexer = new Lexer(tokenArray);
