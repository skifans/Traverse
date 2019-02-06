import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div id="main-body">
    <div id="card-selection">
      <Link className="card" to="/search-journey">
        <img src="./images/journey-card.png" alt="Search Journey"/>
        <h2>Search Journey</h2>
      </Link>
      
      <Link className="card" to="/restriction-codes">
        <img src="./images/restrictionCard.png" alt="Search Codes"/>
        <h2>Restriction Codes</h2>
      </Link>

    </div>
  </div>
);
