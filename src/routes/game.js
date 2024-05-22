import React, { useEffect, useState } from 'react';
import './game.css';

function Game() {
    // useStateフックを使用してresultを宣言
    const [Ope1, setOpe1] = useState(null);
    const [Ope2, setOpe2] = useState(null);
    const [operands, setOperands] = useState([]);
    const [operators, setOperators] = useState([]);
    const [problemFormula, setProblemFormula] = useState(null);
    const [culcNumberFormula, setClucNumberFormula] = useState(null);
    const [culcNumber, setClucNumber] = useState('');
    const [checkFormula, setCheckFormula] = useState(null);
    const [normalFormula, setNormalFormula] = useState(null);
    const [trueOrFalse, settrueOrFlase] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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
        setClucNumber(eval(newStr));
        setClucNumberFormula(newStr);
        // console.log(newStr);
    }, []);

    //ボタンのOn/Off
    useEffect(() => {
        buttonCheck();
    }, [Ope1, Ope2]);

    //値の確認
    // console.log(operands, operators);
    // const str = Culc(operands, operators);

    //ログを表示させるための準備
    const formuladata = data && data.map((item, index) => {
        return (<tr key={index}>
            <td>{item.formula}</td>
        </tr>);
    })

    useEffect(() => {
        //問題式の作成
        var probFormula = "";
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == numberOfOperands - 1) {
                probFormula += operands[i];
            }
            else {
                probFormula += operands[i] + " ";
                probFormula += '□ ';
            }
        }
        setProblemFormula(probFormula);
    }, [operands]);

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

    //一つ目の演算子のボタンを押されたら
    const operandInput1 = (e) => {
        const id = e.currentTarget.id
        setOpe1(id);
        // console.log(id);
    }

    //二つ目の演算子のボタンを押されたら
    const operandInput2 = (e) => {
        const id = e.currentTarget.id
        setOpe2(id);
        // console.log(id);
    }

    //決定ボタンを押せるようになる基準を指定
    function buttonCheck() {
        // 演算子入力の値を確認
        let check = '';
        // console.log(Ope1, Ope2);
        if (Ope1 && Ope2) {
            check = "true";
        }
        else {
            check = "false";
        }

        // useStateフックを使用してボタンのdisabled状態を更新
        setIsButtonDisabled(check !== "true");
    }

    //ユーザが入力した式を作成
    const checkFormulaFunc = () => {
        // console.log(operands, operators);
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

        // addData(checktimeFormula);
        addData(checktimeFormula);
    }

    // 生成式と入力式の結果があっているか確認
    function checkTrueOrFalse(checkNumber) {
        //作成したものを比較
        // console.log(culcNumber, checkNumber);
        //正解なら表示して式を更新
        if (culcNumber == checkNumber) {
            settrueOrFlase('正解');
            // problemFormulaの内容を演算子付きの式に更新
            const replacedString = culcNumberFormula.replace(/\*|\//g, function (match) {
                return match === "*" ? "×" : "÷";
            });
            //problemFormulaを置き換えたものに更新
            setProblemFormula(replacedString);
        }
        //不正解なら表示するのみ
        else settrueOrFlase('不正解');
    }

    //データを追加する関数
    const addData = (checktimeFormula) => {
        //受け取り変数の確認
        // console.log(checktimeFormula);

        //通常式の初期化
        var normalFormula = '';

        //送るために一般演算子の式を作成
        const checkOpe = [Ope1, Ope2];
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == 2) normalFormula += operands[i];
            else {
                normalFormula += operands[i];
                normalFormula += ' ' + checkOpe[i] + ' ';
            }
        }
        //一般演算子の式をセット
        setNormalFormula(normalFormula);

        // 送るオブジェクトの作成
        const formula = normalFormula + " = " + eval(checktimeFormula);
        const newData = {
            formula: formula
        };

        //作成データの確認
        // console.log(newData);
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
                //データを新規順にしている
                setData(data.reverse());
            })
            .catch(error => {
                console.error('Error fetching formula data:', error);
                setData([]);
            });
    }

    // ページをリロードしてデータベースを初期化する関数
    const ReloadAndInitializeDatabase = () => {
        fetch('http://localhost:8080/game/initialize-database', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('Database initialized successfully');
                } else {
                    console.error('Failed to initialize database');
                }
            })
            .catch(error => {
                console.error('Error initializing database:', error);
            });
        window.location.reload();
    }

    // 式の表示
    return (
        <div>
            <h2>問題式</h2>
            <p>{problemFormula} = {culcNumber}</p>
            <button onClick={ReloadAndInitializeDatabase}>問題を更新</button>

            {/* <form>
                <input type="text" placeholder='演算子を入力'></input>
            </form> */}
            <br></br>
            <h2>回答</h2>

            {checkFormula && (
                <div>
                    <p><br></br>{normalFormula} = {eval(checkFormula)}</p>
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
            <button onClick={checkFormulaFunc} disabled={isButtonDisabled}>決定</button>

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
