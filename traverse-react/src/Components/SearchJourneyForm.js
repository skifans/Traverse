import React, { Component } from 'react';

const fLeft = {
  float: 'left'
};
const fRight = {
  float: 'right'
};

export default class SearchJourneyForm extends Component {
  render() {
    return (
      <div id="main-body">
        <div id="search-journey-body">
          <div id="search-journey-options">
            <form>
              <div id="drop-down-options">
                <ul>
                  <li>
                    <select>
                      <option value="RTN">Return</option>
                      <option value="SIN">Single</option>
                      <option value="MLJ">Multi-leg</option>
                    </select>
                  </li>
                  <li>
                    <select>
                      <option>Adults</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </li>
                  <li>
                    <select>
                      <option>Children</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </li>
                  <li>
                    <select>
                      <option>Railcard</option>
                      <option value="STT">16-25 Railcard</option>
                      <option value="TST">26-30 Railcard</option>
                      <option value="SRC">Senior Railcard</option>
                      <option value="FFR">Family riends Railcard</option>
                      <option value="TTR">Two Together Railcard</option>
                      <option value="NRC">Network Railcard</option>
                      <option value="DPR">Disabled Persons Railcard</option>
                    </select>
                  </li>
                </ul>
              </div>
                <div id="filter-options-title">
                  <p>Filter options</p><label><input type="checkbox"/>Use Account Preferences</label>
                </div>
                <div id="filter-options">
                  <ul>
                    <li style={fLeft}><label><input type="checkbox"/>Step free access</label></li>
                    <li style={fRight}><label><input type="checkbox"/>Departure assistance</label></li>
                    <li style={fLeft}><label><input type="checkbox"/>Bike Storage (Station)</label></li>
                    <li style={fRight}><label><input type="checkbox"/>Bike Storage (Train)</label></li>
                  </ul>
                </div>
            </form>
          </div>
        </div>
      </div>   
    );
  }
}
