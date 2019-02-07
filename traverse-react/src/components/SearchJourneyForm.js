import React, {Component} from 'react';
import Options from './SearchJourneyFormOptions';
import Inputs from './SearchJourneyFormInputs'

export default class SearchJourneyForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDate: new Date(),
      origin: "",
      destination: ""
    }

    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleDateIncrement = this.handleDateIncrement.bind(this);
    this.handleDateDecrement = this.handleDateDecrement.bind(this);
    this.handleOriginInput = this.handleOriginInput.bind(this);
    this.handleDestinationInput = this.handleDestinationInput.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
  }

  handleDateSelect(date){
    this.setState({selectedDate: date})
  }
  handleDateIncrement(){
    this.setState((prevState) =>{
      return {
        selectedDate: new Date(prevState.selectedDate.getTime() + 86400000)
      }
    })
  }
  handleDateDecrement(){
    let {selectedDate} = this.state;
    let today = parseInt(new Date().getTime() / 86400000) * 86400000;
    let selectedDateMillis = selectedDate.getTime();
    if(selectedDateMillis - 86399999 > today){
      this.setState((prevState) =>{
        return {
          selectedDate: new Date(prevState.selectedDate.getTime() - 86400000)
        }
      })
    }
  }
  handleOriginInput(e){
    this.setState({origin: e.target.value})
    console.log(this.state.origin);
  }
  handleDestinationInput(e){
    this.setState({destination: e.target.value})
  }
  handleSwap(){
    this.setState((prevState) =>{
      return {
        origin: prevState.destination,
        destination: prevState.origin
      }
    })
  }

  render(){
    let {selectedDate, origin, destination} = this.state;
    return (
      <div id="main-body">
        <h2> {selectedDate.getMonth() + " " + selectedDate.getDate()}</h2>
        <Options/>
        <Inputs
          incrementDate={this.handleDateIncrement}
          decrementDate={this.handleDateDecrement}
          onClickDate={this.handleDateSelect}
          dateValue={this.state.selectedDate}
          onOriginChange={this.handleOriginInput}
          origin={origin}
          onDestinationChange={this.handleDestinationInput}
          destination={destination}
          onSwap={this.handleSwap}
          showCalendar={true}
        />
      </div>
    );
  }
}
