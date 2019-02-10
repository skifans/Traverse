import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Restrictions from './Restrictions';

const ErrorContainer = props => (
  <div className="code-error-container">
    {props.children}

    <div id="search-again-btn">
      <Link to="/restriction-codes"><input type="submit" value="Search Again" /></Link>
    </div>
  </div>
);

export default class RestrictionCodeResults extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: this.props.location.state.code.length === 2,
      data: {},
      error: null
    }
  }

  componentWillMount() {
    const { code } = this.props.location.state;
    
    fetch(`/api/restriction-codes/${code}`)
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false}))
      .catch(error => this.setState({ error, data: null, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading-animation">Loading</div>
      );
    } else if (this.state.data) {
      const { data } = this.state;

      if (data.isValid) {
        return (
          <div id="main-body">
            <div id="results">
              <h2>Ticket Restriction Code</h2>
              <h2 id="current-code">{data.code}</h2>

              <h3>Outward Restrictions</h3>
              <Restrictions restrictions={data.outRestrictions} />
              <h3>Return Restrictions</h3>
              <Restrictions restrictions={data.rtnRestrictions} />

              <div id="search-again-btn">
                <Link to="/restriction-codes"><input type="submit" className="search-form-buttons" value="Search Again" /></Link>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <ErrorContainer>
            <h1>We couldn't find the restriction code {data.code}, please try searching for a different code.</h1>
          </ErrorContainer>
        );
      }
    } else {
      return (
        <ErrorContainer>
          <h1>A network error occured while looking up the given restriction code. Please try again later.</h1>
        </ErrorContainer>
      );
    }
  }

}
