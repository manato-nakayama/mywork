import React from 'react';

function Register() {
    return (
        <div>
            <h2>新規登録</h2>
            <form>
                <label>ID:</label>
                <input type="text" />
                <label>パスワード:</label>
                <input type="password" />
                <label>パスワード（確認）:</label>
                <input type="password" />
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

export default Register;
