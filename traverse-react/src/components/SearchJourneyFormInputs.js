import React, {Component} from 'react';


export default class SearchJourneyFormInputs extends Component{
  render(){
    return (
      <div id="search-journey-inputs">
        <div id="one-leg">
          <div id="search-journey-stations">
            <input type="text" placeholder="Origin Station"/>
            <img id="swapLoc" src="/images/swapArrows.png" alt=""/>
            <input type="text" placeholder="Destination Station"/>
          </div>

          <div id="search-journey-date">
            <img src="/images/calendarIcon.png" alt="" height="25px" width="auto"/>
            <input type="text" placeholder="Wed, 20th Feb"/>
            <img className="date-increment" src="/images/leftArrow.png" height="20px" width="auto" alt=""/>
            <img className="date-increment" src="/images/rightArrow.png" height="20px" width="auto" alt=""/>
          </div>
        </div>

        <input id="add-leg" value="Add Leg" type="submit"/>
        <input id="search-journey-submit" value="Search" type="submit"/>
      </div>
    )
  }
}
