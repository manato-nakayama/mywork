import React, { useEffect, useState } from 'react';
import './game.css';

function Game() {
    // useStateフックを使用して様々な変数を宣言
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
        //ユーザーが入力した演算子を配列にする
        const checkOpe = [Ope1, Ope2];

        var checktimeFormula = "";

        //繰り返しをして乗除演算子は変換しながら"="の左側を作る
        for (let i = 0; i < numberOfOperands; i++) {
            if (i == 2) checktimeFormula += operands[i];
            else {
                checktimeFormula += operands[i];
                if (checkOpe[i] == '×') {
                    checktimeFormula += ' * ';
                }
                else if (checkOpe[i] == '÷') {
                    checktimeFormula += ' / ';
                }
                else {
                    checktimeFormula += ' ' + checkOpe[i] + ' ';
                }
            }
        }
        //checkFormulaに格納
        setCheckFormula(checktimeFormula);

        //計算結果をcheckNumberに格納して生成式の計算結果と比較
        const checkNumber = eval(checktimeFormula);
        checkTrueOrFalse(checkNumber);

        //データの追加をリクエスト
        addData(checktimeFormula);
    }

    // 生成式と入力式の結果があっているか確認
    function checkTrueOrFalse(checkNumber) {
        //作成したものを比較
        // console.log(culcNumber, checkNumber);
        //正解・不正解を入れる要素を変数に
        var element = document.getElementById("trueOrFalse");
        //正解なら表示して式を更新
        if (culcNumber == checkNumber) {
            settrueOrFlase('正解');
            //クラスを追加
            element.classList.add("correct");
            element.classList.remove("incorrect");
            // problemFormulaの内容を演算子付きの式に更新
            const replacedString = culcNumberFormula.replace(/\*|\//g, function (match) {
                return match === "*" ? "×" : "÷";
            });
            //problemFormulaを置き換えたものに更新
            setProblemFormula(replacedString);
            //決定ボタンを押せないようにする
            // element = document.getElementById("decide");
            // element.classList.toggle("display-none");
        }
        //不正解なら表示して属性を付与
        else {
            settrueOrFlase('不正解');
            element.classList.add("incorrect");
        }
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

        // springbootへ送るオブジェクトの作成
        const formula = normalFormula + " = " + eval(checktimeFormula);
        const newData = {
            formula: formula
        };

        //作成データの確認
        // console.log(newData);

        //データ追加のリクエストをする
        fetch('http://localhost:8080/game/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //newDataをjson形式で渡す。
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
        //ここにHTTPのGETリクエストをする
        fetch('http://localhost:8080/game')
            //responseをjson形式に
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

    // ページをリロードしてデータベースを初期化する関数を呼び出す
    const ReloadAndInitializeDatabase = () => {
        //該当機能の場所に対してHTTPリクエストをする
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

        //ページのリロード
        window.location.reload();
    }

    // 一覧表示
    return (
        <div>
            <h1>ブラックボックス演算子</h1>
            <div className='container'>
                <div className='problem'>
                    <h2>問題式</h2>
                    <p>{problemFormula} = {culcNumber}</p>
                    <br></br>
                    <p>判定結果</p>
                    {!trueOrFalse && (<br></br>)}
                    <p id="trueOrFalse">{trueOrFalse}</p>
                </div>
                <br></br>
                <div className='answer'>
                    <h2>回答</h2>
                    {checkFormula && (
                        <div>
                            <p>{normalFormula} = {eval(checkFormula)}</p>
                        </div>
                    )}
                    {!checkFormula && (<br></br>)}
                    <div className='opebox'>
                        <div>
                            <p>一つ目の演算子</p>
                            {Ope1 && (
                                <p>{Ope1}</p>
                            )}
                            {!Ope1 && (<p></p>)}
                            <div className="ope1">
                                <button className='ope1button' id="+" onClick={operandInput1}>+</button>
                                <button className='ope1button' id="-" onClick={operandInput1}>-</button>
                                <button className='ope1button' id="×" onClick={operandInput1}>×</button>
                                <button className='ope1button' id="÷" onClick={operandInput1}>÷</button>
                            </div>
                        </div>

                        <div>
                            <p>二つ目の演算子</p>
                            {Ope2 && (
                                <p>{Ope2}</p>
                            )}
                            {!Ope2 && (<p></p>)}

                            <div className="ope2">
                                <button className='ope2button' id="+" onClick={operandInput2}>+</button>
                                <button className='ope2button' id="-" onClick={operandInput2}>-</button>
                                <button className='ope2button' id="×" onClick={operandInput2}>×</button>
                                <button className='ope2button' id="÷" onClick={operandInput2}>÷</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {probFormla} = {eval(str)}</p> */}
            <br></br>
            <button id="decide" onClick={checkFormulaFunc} disabled={isButtonDisabled}>決定</button>

            <p><button id="update" onClick={ReloadAndInitializeDatabase}>問題を更新</button></p>

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
