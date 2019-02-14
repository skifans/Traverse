import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RestrictionCodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.value.length === 2) {
      this.props.history.push(`/restriction-codes/results`, { code: this.state.value });
    }
  }

  componentDidMount() {
    this.refs.codeInput.focus();
  }

  render() {
    return (
      <div id="main-body">
        <div id="restriction-code-information">
          <h2>Ticket Restriction Codes</h2>
          <p>
            Ticket restriction codes restrict when, where, or on which service you can travel. 
            They are typically found on the front, look for two character long code e.g. L1, G3, 56, HY. 
            If you cannot find one, you may be eligible for any route.
          </p>
          <p>
            Search below using the ticket, or click <Link id="help-link" to="">here for help.</Link>
          </p>
        </div>
        <div id="ticket">
          <div id="ticket-restriction-code-search">
            <h2>Search Ticket Restriction Code</h2>
            <div id="ticket-background">
              <p>
                Traverse with ease
                <br/>
                Search ticket code restrictions here:
              </p>
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="ticket-restriction-code" id="label-route">CODE:</label><br />
                  <input
                    type="text"
                    id="ticket-restriction-code"
                    value={this.state.value}
                    onChange={this.handleChange}
                    ref="codeInput"
                    placeholder="Enter Restriction Code"
                    maxLength="2" />
                  <input className="search-form-buttons" type="submit" value="Search" />
                </form>
            </div>
            <h3>
              <img src="/images/raillogo.png" alt="National Rail Logo" height="30px" width="47px" />
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
