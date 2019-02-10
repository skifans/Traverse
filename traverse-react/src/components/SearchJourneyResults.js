import React, {Component} from 'react';

export default class SearchJourneyResults extends Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    const { origin, destination } = this.props.location.state;
    console.log(origin);
    console.log(destination);
  }

  render(){

    return(
      <div id="main-body">
        <h2>Result</h2>
        <p></p>
      </div>
    );
  }
}