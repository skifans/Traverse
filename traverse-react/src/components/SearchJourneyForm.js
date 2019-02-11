import React, {Component} from 'react';
import Options from './SearchJourneyFormOptions';
import Inputs from './SearchJourneyFormInputs'

export default class SearchJourneyForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDate: [new Date()],
      origin: [""],
      destination: [""],
      legs: 1,
      journeyType: 0
    };

    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleOriginInput = this.handleOriginInput.bind(this);
    this.handleDestinationInput = this.handleDestinationInput.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.addLeg = this.addLeg.bind(this);
    this.deleteLeg = this.deleteLeg.bind(this);
    this.handleJourneyTypeChange = this.handleJourneyTypeChange.bind(this);
  }

  handleDateSelect(dateArr, id){
    this.setState((prevState) => {
      return {
        selectedDate: prevState.selectedDate.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return dateArr[0];
          }
        })
      }
    })
  }
  handleOriginInput(e, id){
    console.log(e.target.value + "    " + id)
    let newVal = e.target.value;
    this.setState((prevState) => {
      return {
        origin: prevState.origin.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return newVal;
          }
        })
      }
    })
  }
  handleDestinationInput(e, id){
    let newVal = e.target.value;
    this.setState((prevState) => {
      return {
        destination: prevState.destination.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return newVal;
          }
        })
      }
    })
  }
  handleSwap(id){
    this.setState((prevState) => {
      return{
        origin: prevState.origin.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return prevState.destination[id];
          }
        }),
        destination: prevState.destination.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return prevState.origin[id];
          }
        })
      }
    })
  }
  addLeg(){
    if(this.state.legs < 3) {
      this.setState((prevState) => {
        return {
          legs: prevState.legs + 1,
          selectedDate: prevState.selectedDate.concat([new Date()]),
          destination: prevState.destination.concat([""]),
          origin: prevState.origin.concat([""])
        }
      })
    }
  }
  deleteLeg(e,id){
    e.preventDefault();
    this.setState((prevState) =>{
      return {
        selectedDate: [...prevState.selectedDate].splice(id - 1, 1),
        origin: [...prevState.origin].splice(id - 1, 1),
        destination: [...prevState.destination].splice(id - 1, 1),
        legs: prevState.legs - 1
      }
    })
  }

  //Option's functions
  handleJourneyTypeChange(e){
    if(this.state.legs === 1){
      this.setState({journeyType: +e.target.value})
    } else{
      let val = +e.target.value
      this.setState((prevState) =>{
        return {
          selectedDate: [...prevState.selectedDate].splice(1),
          origin: [...prevState.origin].splice(1),
          destination: [...prevState.destination].splice(1),
          legs: 1,
          journeyType: val
        }
      })
    }
  }


  render(){
    let {selectedDate, origin, destination, legs, journeyType} = this.state;
    let deleteOpt = legs > 1;

    let inputLegs = [];
    for(let i = 0; i < legs; i++){
      inputLegs.push(<Inputs
          key={i}
          id={i}
          dateValue={this.state.selectedDate[i]}
          destination={destination[i]}
          origin={origin[i]}
          onClickDate={this.handleDateSelect}
          onDestinationChange={this.handleDestinationInput}
          onOriginChange={this.handleOriginInput}
          onSwap={this.handleSwap}
          onDelete={this.deleteLeg}
          deleteOption={deleteOpt}
      />)
    }
    return (
      <div id="main-body">
        <form>
          <Options journeyType={journeyType}
                   onJourneyTypeChange={this.handleJourneyTypeChange}
          />
          {inputLegs}
          {legs < 3 && journeyType === 2? <input onClick={this.addLeg} className="search-form-buttons" value="Add Leg" type="button"/>: ""}
          <input className="search-form-buttons" value="Search" type="submit"/>
        </form>
      </div>
    );
  }
}
