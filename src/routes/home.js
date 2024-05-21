import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <div>
                <Link to="/register">
                    <button>新規登録</button>
                </Link>
            </div>
            <div>
                <Link to="/login">
                    <button>ログイン</button>
                </Link>
            </div>
            <div>
                <Link to="/guest">
                    <button>ゲストでログイン</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;