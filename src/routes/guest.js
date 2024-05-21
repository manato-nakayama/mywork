import React from 'react';
import { Link } from 'react-router-dom';

function Guest() {
    return (
        <div>
            <h2>ゲストでログイン</h2>
            <p>ゲストでログインしました</p>
            <div>
                <Link to="/game">
                    <button>ゲームを始める</button>
                </Link>
            </div>
        </div>
    );
}

export default Guest;
