import React from 'react';
import Login from './Login';
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
        <Login />
    </header>
);
