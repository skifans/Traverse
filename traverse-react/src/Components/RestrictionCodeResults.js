import React, { Component } from 'react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default class RestrictionCodeResults extends Component {
  constructor(props){
    super(props);

    // App starts by loading unless given code could be invalid
    this.state = {
      loading: this.props.location.state.code.length === 2,
      data: {}
    }
  }

  async componentDidMount() {
    const { code } = this.props.location.state;
    const httpResponse = await fetch(`/api/restriction-codes/${code}`);

    const data = await httpResponse.json();
    this.setState({
      data,
      loading: false
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading-animation">Loading</div>
      );
    } else {
      let outRestrictions, rtnRestrictions;
      if (this.state.data.outRestrictions) {
        outRestrictions = this.state.data.outRestrictions;
      }
      if (this.state.data.rtnRestrictions) {
        rtnRestrictions = this.state.data.rtnRestrictions;
      }

      return (
        <div id="main-body">
          <div id="results">
            <h2>Ticket Restriction Code</h2>
            <h2 id="current-code">{this.state.data.code}</h2><br/><br/>

            <div id="day-list">
              <input type="radio" id="mon" name="day"/>
              <label htmlFor="mon">Monday</label>
              <input type="radio" id="tue" name="day"/>
              <label htmlFor="tue">Tuesday</label>
              <input type="radio" id="wed" name="day"/>
              <label htmlFor="wed">Wednesday</label>
              <input type="radio" id="thu" name="day"/>
              <label htmlFor="thu">Thursday</label>
              <input type="radio" id="fri" name="day"/>
              <label htmlFor="fri">Friday</label>
              <input type="radio" id="sat" name="day"/>
              <label htmlFor="sat">Saturday</label>
              <input type="radio" id="sun" name="day"/>
              <label htmlFor="sun">Sunday</label>
            </div>

            <h3>Outward Restrictions</h3>
            <img src="../images/calendarIcon.png" align="center" height="30px" width="30px" alt="Day" /><span>{outRestrictions[0].days.map(day => DAYS[day]).join(', ')}</span><br/>
            <img src="../images/timeIcon.png" align="center" height="30px" width="30px" alt="Time" /><span>{outRestrictions[0].times || 'All times'}</span><br/>
            <img src="../images/pinIcon.png" align="center" height="30px" width="30px" alt="Location" /><span>{outRestrictions[0].route || 'All routes'}</span><br/>
            <img src="../images/errorIcon.png" align="center" height="30px" width="30px" alt="Info" /><span>{outRestrictions[0].other || 'N/A'}</span><br/>
            
            <h3>Return Restrictions</h3>
            <img src="../images/calendarIcon.png" align="center" height="30px" width="30px" alt="Day" /><span>{rtnRestrictions[0].days.map(day => DAYS[day]).join(', ')}</span><br/>
            <img src="../images/timeIcon.png" align="center" height="30px" width="30px" alt="Time" /><span>{rtnRestrictions[0].times || 'All times'}</span><br/>
            <img src="../images/pinIcon.png" align="center" height="30px" width="30px" alt="Location" /><span>{rtnRestrictions[0].route || 'All routes'}</span><br/>
            <img src="../images/errorIcon.png" align="center" height="30px" width="30px" alt="Info" /><span>{rtnRestrictions[0].other || 'N/A'}</span><br/>
            <div align="right">
              <input type="submit" value="Search Again" align="middle"/>
            </div>
          </div>
        </div>
      );
    }
  }


}
