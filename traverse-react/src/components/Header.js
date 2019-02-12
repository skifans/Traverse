import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header>
        <div id="menu">
            <h2><Link to="">Traverse</Link></h2>
            <ul>
                <li><Link to="/search-journey">search journey</Link></li>
                <li><Link to="/restriction-codes">look-up restriction codes</Link></li>
            </ul>
        </div>
        <div id="login">
            <form>
                <input type="image" src="images/login.png" />
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
            </form>
            <p>not registered? <span>sign up!</span></p>
        </div>
    </header>
);
