import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Restrictions from './Restrictions';

export default class RestrictionCodeResults extends Component {
  constructor(props){
    super(props);
    // App starts by loading unless given code could be invalid
    this.state = {
      loading: this.props.location.state.code.length === 2,
      data: {}
    }
  }

  componentWillMount() {
    const { code } = this.props.location.state;
    
    fetch(`/api/restriction-codes/${code}`)
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false}));
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="loading-animation">Loading</div>
      );
    } else {
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

            <Restrictions restrictions={this.state.data.outRestrictions} title="Outward Restrictions" />
            <Restrictions restrictions={this.state.data.rtnRestrictions} title="Return Restrictions" />

            <div align="right">
              <Link to='/restriction-codes'><input type="submit" value="Search Again" align="middle"/></Link>
            </div>
          </div>
        </div>
      );
    }
  }

}
