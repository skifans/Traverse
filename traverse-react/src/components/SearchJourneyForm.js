import React, {Component} from 'react';
import Options from './SearchJourneyFormOptions';
import Inputs from './SearchJourneyFormInputs'

export default class SearchJourneyForm extends Component{
  
  render(){
    return (
      <div id="main-body">
        <Options/>
        <Inputs/>
      </div>
    );
  }
}
