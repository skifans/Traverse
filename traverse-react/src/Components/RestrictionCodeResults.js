import React, {Component} from 'react';

export default class RestrictionCodeResults extends Component{
  constructor(props){
    super(props);
    if(this.props.location.state.code != ""){
      console.log(this.props.location.state.code);
      this.state = {
        load: true,
      }
    } else{
      this.state = {
        load: false
      }
    }
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
  }

  render(){
    if(this.state){
      return(
        <div className="loading-animation">Loading</div>
      )
    } else {
      return (
        <div id="main-body">
        <div id="results">
          <h2>Ticket Restriction Code</h2>
          <h2 id="current-code">??</h2><br/><br/>

          <div id="day-list">
            <input type="radio" id="mon" name="day"/>
            <label for="mon">Monday</label>
            <input type="radio" id="tue" name="day"/>
            <label for="tue">Tuesday</label>
            <input type="radio" id="wed" name="day"/>
            <label for="wed">Wednesday</label>
            <input type="radio" id="thu" name="day"/>
            <label for="thu">Thursday</label>
            <input type="radio" id="fri" name="day"/>
            <label for="fri">Friday</label>
            <input type="radio" id="sat" name="day"/>
            <label for="sat">Saturday</label>
            <input type="radio" id="sun" name="day"/>
            <label for="sun">Sunday</label>
          </div>

          <h3>Outward Restrictions</h3>
          <img src="images/calendarIcon.png" align="center" height="30px" width="30px"></img><span>Day</span><br/>
          <img src="images/timeIcon.png" align="center" height="30px" width="30px"></img><span>Time</span><br/>
          <img src="images/pinIcon.png" align="center" height="30px" width="30px"></img><span>Location</span><br/>
          <img src="images/errorIcon.png" align="center" height="30px" width="30px"></img><span>Info</span><br/>
          
          <h3>Return Restrictions</h3>
          <img src="images/calendarIcon.png" align="center" height="30px" width="30px"></img><span>Day</span><br/>
          <img src="images/timeIcon.png" align="center" height="30px" width="30px"></img><span>Time</span><br/>
          <img src="images/pinIcon.png" align="center" height="30px" width="30px"></img><span>Location</span><br/>
          <img src="images/errorIcon.png" align="center" height="30px" width="30px"></img><span>Info</span><br/>
          <div align="right">
            <input type="submit" value="Search Again" align="middle"/>
          </div>
        </div>
      </div>
      )
    }
  }


}
