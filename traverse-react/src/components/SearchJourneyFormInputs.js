import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Autosuggestion from './Autosuggestion';


const SearchJourneyFormInputs = (props) => {
    const timeChange =(time, str, inst) =>{
        props.onClickTime(time, props.id)
    }
    const dateChange = (date, str, inst) =>{
        props.onClickDate(date, props.id);
    };
    const destChange = (val) =>{
        props.onDestinationChange(val, props.id);
    }
    const originChange = (val) =>{
        props.onOriginChange(val, props.id)
    }

    const deleteButton = props.deleteOption ? (
        <div>
            <button className="delete-button" onClick={(e) => props.onDelete(e,props.id)}>X</button>
        </div>
    ) : "";

    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return (
          <div id="one-leg">
            <div>
                <Autosuggestion onChange={originChange} value={props.origin || ""} placeholder='Origin Station'/>
                <img onClick={() => {props.onSwap(props.id)}} src="/images/arrows.png" alt=""/>
                <Autosuggestion onChange={destChange} value={props.destination || ""} placeholder="Destination Station"/>
            </div>
            <div className="calendar">
                <Flatpickr placeholder="Select Date..." onClose={dateChange} value={props.dateValue} options={{defaultDate: props.dateValue, minDate: today, altInput: true}}/>
            </div>
            <div className="calendar">
                <Flatpickr placeholder="Depart After..." onClose={timeChange} value={props.timeValue} options={{enableTime: true, noCalendar: true, dateFormat:"H:i", time_24hr:true}}/>
            </div>
            {deleteButton}
          </div>
      )
    }

export default SearchJourneyFormInputs;
