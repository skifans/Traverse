import React, {Component} from 'react';
import DayOfWeek from './DayOfWeek';
import Week from './Week';
import Day from './Day';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeekArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

class Calendar extends Component{
  constructor(props){
    super(props);
    let today = new Date();
    this.state = {
      today: today,
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear()
    }

    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
  }

  prevMonth(e){
    e.preventDefault();
    if(this.state.currentMonth === 0){
      this.setState((prevState) =>{
        return {
          currentYear: prevState.currentYear - 1,
          currentMonth: 11
        }
      });
    } else{
      this.setState((prevState) =>{
        return {currentMonth: prevState.currentMonth - 1}
      });
    }
  }

  nextMonth(e){
    e.preventDefault();
    if(this.state.currentMonth === 11){
      this.setState((prevState) =>{
        return {
          currentYear: prevState.currentYear + 1,
          currentMonth: 0
        }
      });
    } else{
      this.setState((prevState) =>{
        return {currentMonth: prevState.currentMonth + 1}
      });
    }
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
      while(days.length % 7 !== 0 || days.length === 0){
        let date = new Date(firstSundayMillis);
        let props = {
          selectedMonth: month,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          today: Date.now()
        }
        days.push((
          <Day {...props}/>
        ));
        if(date.getDate() === 27 && date.getMonth() === 9){
          firstSundayMillis += 90000000
        } else {
          firstSundayMillis += dayInMillis;
        }
      }
      weeks.push(<Week key={i}>{days}</Week>)
      days = [];
      let nextMonth = new Date(firstSundayMillis).getMonth();
      if((nextMonth > month || nextMonth === 0) && weeks.length >= 4){
        break;
      }
    }
    return weeks;
  }

  render(){
    const {today, currentMonth, currentYear} = this.state;
    let daysOfWeek = [];
    let weeks;

    let nav = (
      <tr className="navigation-header">
        <th>
          <button
            className="prev-month"
            onClick={this.prevMonth}
            disabled={today.getMonth() === currentMonth && today.getFullYear() === currentYear? true: false}
            >
            &lt;&lt;
          </button>
        </th>
        <th colSpan="5">
          <span className="month-text">{months[currentMonth]}</span>
          <span className="year-text">{currentYear}</span>
        </th>
        <th>
          <button className="next-month" onClick={this.nextMonth}>&gt;&gt;</button>
        </th>
      </tr>
    );

    daysOfWeekArray.forEach(day => daysOfWeek.push(<DayOfWeek key={day} day={day}/>))

    //
    let oct27 = new Date(2019, 9, 27,0,0,0,0)
    let oct272 = new Date(2019, 9, 28,0,0,0,0)
    console.log(oct27);
    console.log(oct272.getTime() - oct27.getTime());
    weeks = this.generateWeeks(this.state.currentMonth, this.state.currentYear);

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
          <tbody className="week-rows">{weeks}</tbody>
        </table>
      </div>
    )
  }
}

export default Calendar;
