import React, {Component} from 'react';
import DayOfWeek from './DayOfWeek';
import Week from './Week';
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeekArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

class Calendar extends Component{
  constructor(props){
    super(props);
  }

  generateWeeks(month, year){
    const dayInMillis = 86400000;
    let weeks = [];
    let days = [];
    let firstDay = new Date(year, month, 1, 0, 0, 0, 0);
    let firstDayMillis = firstDay.getTime();
    let dayOfWeek = firstDay.getDay();
    let firstSundayMillis = firstDayMillis - dayOfWeek * dayInMillis;
    let i = 0;

    while(true){
      while(days.length % 7 != 0 || days.length == 0){
        let date = new Date(firstSundayMillis);
        let day = date.getDate()
        console.log(day);
        days.push(day);
        firstSundayMillis += dayInMillis;
      }
      weeks.push(<Week key={i}>{days}</Week>)
      days = [];
      let nextMonth = new Date(firstSundayMillis).getMonth();
      if(nextMonth > month && weeks.length >= 4){
        break;
      }
    }
    console.log(days);
    return weeks;
  }

  render(){
    let date = new Date();
    let daysOfWeek = [];
    let weeks;

    let nav = (
      <tr className="navigation-header">
        <th>
          <button className="prev-month">«</button>
        </th>
        <th>
          <span className="month-text">{months[date.getMonth()]}</span>
          <span className="year-text">{date.getFullYear()}</span>
        </th>
        <th>
          <button className="next-month">»</button>
        </th>
      </tr>
    );

    daysOfWeekArray.forEach(day => daysOfWeek.push(<DayOfWeek key={day} day={day}/>))

    //
    let newdate = new Date(2019, 2,1, 0,0,0,0)
    let newdate2 = new Date(2019, 2,2,0,0,0,0)
    console.log(newdate.getDay());
    console.log(newdate.getTime() - newdate2.getTime());
    weeks = this.generateWeeks(5, 2019);

    //

    return(
      <div style={{
          left: this.props.position.x,
          top: this.props.position.y + 15,
          display: this.props.position.show ? "block": "none"
        }} className="calendar">
        <table>
          <thead>{nav}</thead>
          <thead>
            <tr className="week-days">{daysOfWeek}</tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    )
  }
}

export default Calendar;
