import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import NoMatch from './routes/nomatch';
import Register from './routes/resister';
import Login from './routes/login';
import Guest from './routes/guest';
import Game from './routes/game';
import Token from './routes/token';

function App() {
  return (
    <div className="App">
      {/* <h1>Hello React Router v6</h1> */}
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
      </ul> */}
      {/* <button onClick={() => { window.location.href = '/about'; }}>About</button> */}
      {/* <button onClick="location.href='about'">About</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/game" element={<Game />} />
        <Route path="/token" element={<Token />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
