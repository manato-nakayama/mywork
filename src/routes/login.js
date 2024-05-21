import React from 'react';

function Login() {
    return (
        <div>
            <h2>ログイン</h2>
            <form>
                <label>ID:</label>
                <input type="text" />
                <label>パスワード:</label>
                <input type="password" />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default Login;
