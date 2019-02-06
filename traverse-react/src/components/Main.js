import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
  <div id="main-body">
    <div id="card-selection">
      <Link className="card" to="/search-journey">
      <div>
        <img src="./images/journey-card.png" alt="Search Journey"/>
        <h2>Search Journey</h2>
      </div>
      </Link>
      <Link className="card" to="/restriction-codes">
      <div>
        <img src="./images/restrictionCard.png" alt="Search Codes"/>
        <h2>Restriction Codes</h2>
      </div>
      </Link>
    </div>
  </div>
);
