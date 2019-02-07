import React, {Component} from 'react';
import Calendar from 'react-calendar';

const SearchJourneyFormInputs = (props) => {

  const inputDate = (date) => {
    return `${date.getDate().toString().padStart(2,"0")}/${date.getMonth().toString().padStart(2, "0")}/${date.getFullYear()}`

  }
  return (
    <div id="search-journey-inputs">
      <div style={{visibility: props.showCalendar ? 'visible' : 'hidden' }}>
        <Calendar
          minDate={new Date()}
          onClickDay={(value) => props.onClickDate(value)}
        />
      </div>
      <div id="one-leg">
        <div id="search-journey-stations">
          <input onChange={props.onOriginChange} value={props.origin} type="text" placeholder="Origin Station"/>
          <img onClick={props.onSwap} id="swapLoc" src="/images/swapArrows.png" alt=""/>
          <input onChange={props.onDestinationChange} value={props.destination} type="text" placeholder="Destination Station"/>
        </div>

        <div id="search-journey-date">
          <img  src="/images/calendarIcon.png" alt="" height="25px" width="auto"/>
          <input type="text" value={inputDate(props.dateValue)} disabled />
          <img onClick={props.decrementDate} className="date-increment" src="/images/leftArrow.png" height="20px" width="auto" alt=""/>
          <img onClick={props.incrementDate} className="date-increment" src="/images/rightArrow.png" height="20px" width="auto" alt=""/>
        </div>
      </div>

      <input id="add-leg" value="Add Leg" type="submit"/>
      <input id="search-journey-submit" value="Search" type="submit"/>
    </div>
  )
}

export default SearchJourneyFormInputs;
