import React, { useEffect, useState } from 'react';
import './game.css';

function Game() {
    // useStateフックを使用してresultを宣言
    const [resultValue, setResultValue] = useState('');
    const [Ope1, setOpe1] = useState(null);
    const [Ope2, setOpe2] = useState(null);
    const [operands, setOperands] = useState([]);
    const [operators, setOperators] = useState([]);
    const [str, setStr] = useState('');
    const [culcNumber, setClucNumber] = useState('');

    // ランダムな値と演算子を生成してoperandとoperator配列に追加する
    const newOperands = [];
    const newOperators = [];
    const numberOfOperands = 3;

    useEffect(() => {
        for (let i = 0; i < numberOfOperands; i++) {
            newOperands[i] = Math.floor(Math.random() * 10) + 1; // ランダムな値を1から10までの範囲で生成
            // operands.push(Math.floor(Math.random() * 10) + 1); 
        }

        for (let i = 0; i < numberOfOperands - 1; i++) {
            const randomOperatorIndex = Math.floor(Math.random() * 4); // ランダムなインデックスを0から3までの範囲で生成
            newOperators[i] = ['+', '-', '*', '/'][randomOperatorIndex]; // ランダムな演算子を選択
            //  operators.push(randomOperator);
        }
        setOperands(newOperands);
        setOperators(newOperators);
        var newStr = "";
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == numberOfOperands - 1) {
                newStr += newOperands[i];
            }
            else {
                newStr += newOperands[i] + " ";
                newStr += newOperators[i] + " ";
            }
        }
        setStr(newStr);
        setClucNumber(eval(newStr));
        // console.log(newStr);
    }, []);


    //値の確認
    // console.log(operands, operators);
    // const str = Culc(operands, operators);

    //計算関数の定義
    // function Culc(operands, operators) {
    //     var str = "";
    //     for (let i = 0; i < numberOfOperands; i++) {
    //         if (i == numberOfOperands - 1) {
    //             str += operands[i];
    //         }
    //         else {
    //             str += operands[i] + " ";
    //             str += operators[i] + " ";
    //         }
    //     }
    //     return str;
    // }
    // console.log(str);
    // console.log(eval(str));

    //問題式の作成
    var probFormla = "";
    for (let i = 0; i < numberOfOperands; i++) {
        if (i == numberOfOperands - 1) {
            probFormla += operands[i];
        }
        else {
            probFormla += operands[i] + " ";
            probFormla += '□ ';
        }
    }

    //回答式の作成
    var ansFormla = "";
    for (let i = 0; i < numberOfOperands; i++) {
        if (i == numberOfOperands - 1) {
            ansFormla += operands[i];
        }
        else {
            ansFormla += operands[i] + " ";
            ansFormla += '<span>□ </span>';
        }
    }
    // document.body.innerHTML += ansFormla;

    //ボタンを押されたら
    const operandInput1 = (e) => {
        // const id = document.getElementById();
        const id = e.currentTarget.id
        setOpe1(id);
        console.log(id);
    }

    const operandInput2 = (e) => {
        // const id = document.getElementById();
        const id = e.currentTarget.id
        setOpe2(id);
        console.log(id);
    }

    const buttons = document.querySelectorAll(".button");
    buttons.forEach(v1 => {
        v1.addEventListener("click", () => {
            buttons.forEach(v2 => v2.classList[v1 == v2 ? "add" : "remove"]("on"));
        });
    });

    // 式の表示
    return (
        <div>
            <h2>問題式</h2>
            <p>{probFormla} = {culcNumber}</p>

            {/* <form>
                <input type="text" placeholder='演算子を入力'></input>
            </form> */}
            <br></br>
            <h2>回答</h2>
            <p>一つ目の演算子</p>
            {Ope1 && (
                <p>{Ope1}</p>
            )}
            <div class="ope1">
                <button id="add" onClick={operandInput1}>+</button>
                <button id="sub" onClick={operandInput1}>-</button>
                <button id="mul" onClick={operandInput1}>×</button>
                <button id="div" onClick={operandInput1}>÷</button>
            </div>

            <p>二つ目の演算子</p>
            {Ope2 && (
                <p>{Ope2}</p>
            )}

            <div class="ope2">
                <button id="add" onClick={operandInput2}>+</button>
                <button id="sub" onClick={operandInput2}>-</button>
                <button id="mul" onClick={operandInput2}>×</button>
                <button id="div" onClick={operandInput2}>÷</button>
            </div>
            {/* {probFormla} = {eval(str)}</p> */}
            <br></br>
        </div>
    );
}

export default Game;
