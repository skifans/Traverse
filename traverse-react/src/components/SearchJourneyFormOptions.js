import React, { Component } from 'react';

export default class SearchJourneyFormOptions extends Component{
  
  render(){
    return (
      <div id="search-journey-options">
        <div id="drop-down-options">
          <div id="col">
            <label htmlFor="journey-type">Journey Type</label>
            <select value={this.props.journeyType} id="journey-type" onChange={this.props.onJourneyTypeChange}>
              <option value="0">Single</option>
              <option value="1">Return</option>
              <option value="2">Multi-leg</option>
            </select>
          </div>
          <div id="col">
            <label htmlFor="num-of-adults">Number of Adults</label>
            <select id="num-of-adults" style={{width:'80px'}}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div id="col">
            <label htmlFor="num-of-children">Number of Children</label>
            <select id="num-of-children" style={{width:'80px'}}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div id="col">
            <label htmlFor="railcard-discount">Railcard</label>
            <select id="railcard-discount">
              <option>None</option>
              <option value="STT">16-25 Railcard</option>
              <option value="TST">26-30 Railcard</option>
              <option value="SRC">Senior Railcard</option>
              <option value="FFR">Family and Friends Railcard</option>
              <option value="TTR">Two Together Railcard</option>
              <option value="NRC">Network Railcard</option>
              <option value="DPR">Disabled Persons Railcard</option>
            </select>
          </div>
        </div>
          <div id="filter-options">
            <p>Filter options</p><label><input type="checkbox"/>Use Account Preferences</label>
            <div id="non-account-preferences">
              <ul>
                <li><label><input type="checkbox"/>Step free access</label></li>
                <li><label><input type="checkbox"/>Departure assistance</label></li>
                <li><label><input type="checkbox"/>Bike Storage (Station)</label></li>
                <li><label><input type="checkbox"/>Bike Storage (Train)</label></li>
              </ul>
            </div>
          </div>
      </div>
    );
  }
}
