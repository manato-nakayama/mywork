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
    const [checkFormula, setCheckFormula] = useState(null);
    const [checkNumber, setCheckNumber] = useState(null);
    const [trueOrFalse, settrueOrFlase] = useState(null);
    const [data, setData] = useState(null);

    // ランダムな値と演算子を生成してoperandとoperator配列に追加する
    const newOperands = [];
    const newOperators = [];
    const numberOfOperands = 3;

    //一度だけ式を作成
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

    //ログを表示させるための準備
    const formuladata = data && data.map((item, index) => {
        return (<tr key={index}>
            <td>{item.formula}</td>
        </tr>);
    })

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

    //一つ目の演算子のボタンを押されたら
    const operandInput1 = (e) => {
        // const id = document.getElementById();
        const id = e.currentTarget.id
        setOpe1(id);
        // console.log(id);
    }

    //二つ目の演算子のボタンを押されたら
    const operandInput2 = (e) => {
        // const id = document.getElementById();
        const id = e.currentTarget.id
        setOpe2(id);
        // console.log(id);
    }

    //ユーザが入力した式を作成
    const checkFormulaFunc = () => {
        console.log(operands, operators);
        const checkOpe = [Ope1, Ope2];
        var checktimeFormula = "";
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == 2) checktimeFormula += operands[i];
            else {
                checktimeFormula += operands[i];
                if (checkOpe[i] == 'add') {
                    checktimeFormula += ' + ';
                }
                else if (checkOpe[i] == 'sub') {
                    checktimeFormula += ' - ';
                }
                else if (checkOpe[i] == 'mul') {
                    checktimeFormula += ' * ';
                }
                else if (checkOpe[i] == '×') {
                    checktimeFormula += ' * ';
                }
                else if (checkOpe[i] == 'div') {
                    checktimeFormula += ' / ';
                }
                else if (checkOpe[i] == '÷') {
                    checktimeFormula += ' / ';
                }
                else {
                    checktimeFormula += ' ' + checkOpe[i] + ' ';
                }
            }
        }
        setCheckFormula(checktimeFormula);
        // console.log(checktimeFormula);
        const checkNumber = eval(checktimeFormula);
        checkTrueOrFalse(checkNumber);

        addData(checktimeFormula);
    }

    function checkTrueOrFalse(checkNumber) {
        //作成したものを比較
        // console.log(culcNumber, checkNumber);
        if (culcNumber == checkNumber) {
            settrueOrFlase('正解');
        }
        else settrueOrFlase('不正解');
    }

    //データを追加する関数
    const addData = (checktimeFormula) => {
        //受け取り変数の確認
        // console.log(checktimeFormula);

        // 送るオブジェクトの作成
        const formula = checktimeFormula + " = " + eval(checktimeFormula);
        const newData = {
            formula: formula
        };

        //作成データの確認
        console.log(newData);
        fetch('http://localhost:8080/game/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(response => {
                if (response.ok) {
                    return fetchCheckData();
                } else {
                    console.error('Failed to add formuladata');
                }
            })
            .catch(error => {
                console.error('Error adding formuladata:', error);
            })
    }

    //データを再取得する関数
    const fetchCheckData = () => {
        fetch('http://localhost:8080/game')
            .then(response => response.json())
            .then(data => {
                setData(data.reverse());
            })
            .catch(error => {
                console.error('Error fetching formula data:', error);
                setData([]);
            });
    }

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

            {checkFormula && (
                <div>
                    <p><br></br>{checkFormula} = {eval(checkFormula)}</p>
                    <p>判定結果<br></br>{trueOrFalse}</p>
                </div>
            )}
            <br></br>
            <p>一つ目の演算子</p>
            {Ope1 && (
                <p>{Ope1}</p>
            )}
            <div className="ope1">
                <button id="+" onClick={operandInput1}>+</button>
                <button id="-" onClick={operandInput1}>-</button>
                <button id="×" onClick={operandInput1}>×</button>
                <button id="÷" onClick={operandInput1}>÷</button>
            </div>

            <p>二つ目の演算子</p>
            {Ope2 && (
                <p>{Ope2}</p>
            )}

            <div className="ope2">
                <button id="+" onClick={operandInput2}>+</button>
                <button id="-" onClick={operandInput2}>-</button>
                <button id="×" onClick={operandInput2}>×</button>
                <button id="÷" onClick={operandInput2}>÷</button>
            </div>
            {/* {probFormla} = {eval(str)}</p> */}
            <br></br>
            <button onClick={checkFormulaFunc}>決定</button>

            {/* <h2>ログ</h2> */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ログ</th>
                    </tr>
                </thead>
                <tbody>
                    {formuladata}
                </tbody>
            </table>
        </div>
    );
}

export default Game;
