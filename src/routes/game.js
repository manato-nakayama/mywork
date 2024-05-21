import React, { useState } from 'react';

function Game() {
    // useStateフックを使用してresultを宣言
    const [resultValue, setResultValue] = useState('');

    // ランダムな値と演算子を生成してoperandとoperator配列に追加する
    const operands = [];
    const operators = [];
    const numberOfOperands = 3;

    for (let i = 0; i < numberOfOperands; i++) {
        operands[i] = Math.floor(Math.random() * 10) + 1; // ランダムな値を1から10までの範囲で生成
        // operands.push(Math.floor(Math.random() * 10) + 1); 
    }

    for (let i = 0; i < numberOfOperands - 1; i++) {
        const randomOperatorIndex = Math.floor(Math.random() * 4); // ランダムなインデックスを0から3までの範囲で生成
        operators[i] = ['+', '-', '*', '/'][randomOperatorIndex]; // ランダムな演算子を選択
        //  operators.push(randomOperator);
    }

    //値の確認
    console.log(operands, operators);
    var str = Culc(operands, operators);

    //計算関数の定義
    function Culc(operands, operators) {
        var str = "";
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == numberOfOperands - 1) {
                str += operands[i];
            }
            else {
                str += operands[i] + " ";
                str += operators[i] + " ";
            }
        }
        return str;
    }
    console.log(str);
    console.log(eval(str));

    // 式の表示
    return (
        <div>
            <h2>問題式</h2>
            <p>{str} = {eval(str)}</p>
        </div>
    );
}

export default Game;
