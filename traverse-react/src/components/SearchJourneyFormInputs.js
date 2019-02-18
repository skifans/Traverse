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

    const deleteButton = props.deleteOption ? (
        <div>
            <button className="delete-button" onClick={(e) => props.onDelete(e,props.id)}>X</button>
        </div>
    ) : "";

    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    console.log(today)
    return (
          <div id="one-leg">
            <div>
              <input onChange={originChange} value={props.origin || ""} type="text" placeholder="Origin Station"/>
              <img onClick={() => {props.onSwap(props.id)}} src="/images/arrows.png" alt=""/>
              <input onChange={destChange} value={props.destination || ""} type="text" placeholder="Destination Station"/>
            </div>
            <div className="calendar">
                <Flatpickr placeholder="Select Date..." onClose={dateChange} value={props.dateValue} options={{defaultDate: props.dateValue, minDate: today, altInput: true}}/>
            </div>
            <div className="calendar">
                <Flatpickr placeholder="Select Time..." options={{enableTime: true, noCalendar: true, dateFormat:"H:i", time_24hr:true}}/>
            </div>
            {deleteButton}
          </div>
      )
    }

export default SearchJourneyFormInputs;
