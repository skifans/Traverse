import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <main>
    <div id="main-page">
      <div id="title">
        <h1>Traverse</h1>
        <h2>traverse with ease</h2>
      </div>
      <div id="cards">
        <Link to="/search-journey">
          <img src="./images/train-solid.svg" alt="Search Journey"/>
          <h2>search journey</h2>
        </Link>
        
        <Link to="/restriction-codes">
          <img src="./images/code-branch-solid.svg" alt="Search Codes"/>
          <h2>restriction codes</h2>
        </Link>
        </div>
    </div>
  </main>
);
