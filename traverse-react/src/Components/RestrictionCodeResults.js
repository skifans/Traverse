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
          <h2 id="current-code">??</h2>

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
