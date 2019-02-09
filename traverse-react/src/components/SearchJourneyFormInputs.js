import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css'

const SearchJourneyFormInputs = (props) => {
    const dateChange = (date, str, inst) =>{
        props.onClickDate(date, props.id);
    };
    const destChange = (e) =>{
        props.onDestinationChange(e, props.id);
    }
    const originChange = (e) =>{
        props.onOriginChange(e, props.id)
    }

    return (
        <div id="search-journey-inputs">
          <div id="one-leg">
            <div id="search-journey-stations">
              <input onChange={originChange} value={props.origin} type="text" placeholder="Origin Station"/>
              <img onClick={() => {props.onSwap(props.id)}} id="swapLoc" src="/images/swapArrows.png" alt=""/>
              <input onChange={destChange} value={props.destination} type="text" placeholder="Destination Station"/>
            </div>
            <div className="calendar">
                <h4>When</h4>
                <Flatpickr onClose={dateChange} options={{defaultDate: props.dateValue, minDate: new Date(), altInput: true}}/>
            </div>
            <div className="calendar">
                <h4>At</h4>
                <Flatpickr options={{enableTime: true, noCalendar: true, dateFormat:"H:i", time_24hr:true}}/>
            </div>
          </div>
        </div>
      )
    }

export default SearchJourneyFormInputs;
