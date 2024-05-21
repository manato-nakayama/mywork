import React from 'react';

function ArithmeticExpression() {
    // 演算子の優先順位を定義
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    // 式を分割してトークンの配列を作成する関数
    const tokenizeExpression = (expression) => {
        const tokens = [];
        let currentToken = '';

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (char === ' ') {
                continue;
            }

            if (char.match(/[0-9]/)) {
                currentToken += char;
            } else {
                if (currentToken !== '') {
                    tokens.push(parseInt(currentToken, 10));
                    currentToken = '';
                }
                tokens.push(char);
            }
        }

        if (currentToken !== '') {
            tokens.push(parseInt(currentToken, 10));
        }

        return tokens;
    };

    // 演算子の優先順位を比較する関数
    const hasHigherPrecedence = (op1, op2) => {
        return precedence[op1] >= precedence[op2];
    };

    // 式を計算する関数
    const evaluateExpression = (tokens) => {
        const operators = [];
        const operands = [];

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (typeof token === 'number') {
                operands.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    const op = operators.pop();
                    const b = operands.pop();
                    const a = operands.pop();
                    operands.push(applyOperation(a, b, op));
                }
                operators.pop();
            } else {
                while (operators.length > 0 && hasHigherPrecedence(operators[operators.length - 1], token)) {
                    const op = operators.pop();
                    const b = operands.pop();
                    const a = operands.pop();
                    operands.push(applyOperation(a, b, op));
                }
                operators.push(token);
            }
        }

        while (operators.length > 0) {
            const op = operators.pop();
            const b = operands.pop();
            const a = operands.pop();
            operands.push(applyOperation(a, b, op));
        }

        return operands.pop();
    };

    // 演算を適用する関数
    const applyOperation = (a, b, op) => {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return 0;
        }
    };

    // 式を定義
    const expression = '10 * 3 - 2 / 4';

    // 式をトークン化
    const tokens = tokenizeExpression(expression);

    // 式を計算
    const result = evaluateExpression(tokens);

    return (
        <div>
            <p>Expression: {expression}</p>
            <p>Result: {result}</p>
        </div>
    );
}

export default ArithmeticExpression;
