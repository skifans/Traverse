import React, {Component} from 'react';
import Inputs from './SearchJourneyFormInputs';

export default class SearchJourneyForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDate: [""],
      selectedTime: [""],
      origin: [""],
      destination: [""],
      legs: 1,
      journeyType: 0,
      errors: []
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.handleOriginInput = this.handleOriginInput.bind(this);
    this.handleDestinationInput = this.handleDestinationInput.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.addLeg = this.addLeg.bind(this);
    this.deleteLeg = this.deleteLeg.bind(this);
    this.handleJourneyTypeChange = this.handleJourneyTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.deptAssistance = React.createRef();
    this.stepFree = React.createRef();
    this.adults = React.createRef();
    this.children = React.createRef();
    this.railcards = React.createRef();
    this.loading = React.createRef();
  }

  getErrors(){
    let errors = [];
    if (+this.adults.current.value + (+this.children.current.value) === 0) {
      errors.push("Passengers number can't be 0. Add either an adult or a child.")
    }
    if(this.state.origin.findIndex( d => d === "") > -1){
      errors.push("Origin field is empty")
    }
    if(this.state.destination.findIndex( d => d === "") > -1){
      errors.push("Destination field is empty")
    }
    if(this.state.selectedDate.findIndex( d => d === "") > -1){
      errors.push("Date field is empty")
    }
    if(this.state.selectedDate.findIndex( d => d === "") > -1){
      errors.push("Time field is empty")
    }
    return errors;
  }


  handleSubmit(e){
    e.preventDefault();
    let errors = this.getErrors();
    if(errors.length <= 0) {
      this.loading.current.style.display = "block";
      let today = new Date();
      today = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      let datetime = this.state.selectedDate.map((d, i) => {
        let time = this.state.selectedTime[i];
        if (time) {
          return new Date(d.getTime() + time.getTime() - today)
        } else {
          return d
        }
      });
      console.log(datetime);
      let legs = [];
      for (let i = 0; i < this.state.legs; i++) {
        legs.push({origin: this.state.origin[i].crs, destination: this.state.destination[i].crs, datetime: datetime[i]})
      }

      let data = {
        legs: legs,
        journeyType: this.state.journeyType,
        adults: this.adults.current.value,
        children: this.children.current.value,
        railcards: this.railcards.current.value === "Railcard" ? undefined : this.railcards.current.value,
        options: {
          stepFree: this.stepFree.current.checked,
          deptAssistance: this.deptAssistance.current.checked,
        }
      };
      console.log(data);
      fetch('/api/search-journey', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      }).then(res => res.json()).then(dataReceived => {
        console.log(dataReceived);
        this.props.history.push(`/search-journey/results`, {data, dataReceived});
      })
    } else{
      this.setState({errors: errors})
    }

  }
  handleTimeSelect(timeArr, id){
    this.setState((prevState) => {
      return {
        selectedTime: prevState.selectedTime.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return timeArr[0];
          }
        })
      }
    })
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
  handleOriginInput(val, id){
    this.setState((prevState) => {
      return {
        origin: prevState.origin.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return val;
          }
        })
      }
    })
  }
  handleDestinationInput(val, id){
    this.setState((prevState) => {
      return {
        destination: prevState.destination.map((d, i) => {
          if(i !== id){
            return d;
          } else{
            return val;
          }
        })
      }
    })
  }
  handleSwap(id){
    if(this.state.journeyType === 1){
      this.setState((prevState) =>{
        return {
          origin: [...prevState.destination],
          destination:  [...prevState.origin]
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          origin: prevState.origin.map((d, i) => {
            if (i !== id) {
              return d;
            } else {
              return prevState.destination[id];
            }
          }),
          destination: prevState.destination.map((d, i) => {
            if (i !== id) {
              return d;
            } else {
              return prevState.origin[id];
            }
          })
        }
      })
    }
  }
  addLeg(){
    if(this.state.legs < 3) {
      this.setState((prevState) => {
        return {
          legs: prevState.legs + 1,
          selectedDate: prevState.selectedDate.concat([""]),
          selectedTime: prevState.selectedTime.concat([""]),
          destination: prevState.destination.concat([""]),
          origin: prevState.origin.concat(prevState.destination[prevState.legs - 1])
        }
      })
    }
  }
  deleteLeg(e,id){
    e.preventDefault();

    const deleteRow = (d, i) =>{
      if(i !== id ){
        return d
      } else {
        return
      }
    }

    this.setState((prevState) =>{
      return {
        selectedDate: [...prevState.selectedDate].map(deleteRow).filter((d) => d !== undefined),
        selectedTime: [...prevState.selectedTime].map(deleteRow).filter((d) => d !== undefined),
        origin: [...prevState.origin].map(deleteRow).filter((d) => d !== undefined),
        destination: [...prevState.destination].map(deleteRow).filter((d) => d !== undefined),
        legs: prevState.legs - 1
      }
    })
  }
  handleJourneyTypeChange(e){
    let val = +e.target.value;
    if(val === 0){
      this.setState((prevState) => {
        return {
          selectedDate: [...prevState.selectedDate].splice(0, 1),
          origin: [...prevState.origin].splice(0, 1),
          destination: [...prevState.destination].splice(0, 1),
          selectedTime: [...prevState.selectedTime].splice(0, 1),
          legs: 1,
          journeyType: val
        }
      })
    } else if(val === 1){
      if(this.state.legs === 1){
        this.setState((prevState) =>{
          return {
            journeyType: val,
            legs: 2,
            selectedDate: prevState.selectedDate.concat([""]),
            selectedTime: prevState.selectedTime.concat([""]),
            origin: [...prevState.origin, ...prevState.destination],
            destination: [...prevState.destination, ...prevState.origin]
          }
        })
      } else{
        this.setState((prevState) =>{
          return {
            journeyType: val,
            legs: 2,
            selectedDate: [...prevState.selectedDate].splice(0, 2),
            selectedTime: [...prevState.selectedTime.splice(0,2)],
            origin: [...prevState.origin].splice(0,1).concat( [...prevState.destination].splice(0,1)),
            destination: [...prevState.destination].splice(0,1).concat( [...prevState.origin].splice(0,1))
          }
        })
      }
    } else{
      this.setState((prevState) => {
        return {
          journeyType: val,
          legs: prevState.legs + 1,
          selectedDate: prevState.selectedDate.concat([""]),
          selectedTime: prevState.selectedTime.concat([""]),
          destination: prevState.destination.concat([""]),
          origin: prevState.origin.concat(prevState.destination[prevState.legs - 1])
        }
      })
    }
  }


  render() {
    console.log(this.state)
    const { origin, destination, legs, journeyType } = this.state;
    const deleteOpt = legs > 1 && journeyType === 2;
    let inputLegs = [];
    const today = new Date()
    for(let i = 0; i < legs; i++) {
      let minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      let minTime = null
      if(this.state.selectedTime[i] instanceof Date && this.state.selectedDate[i] instanceof Date && this.state.selectedDate[i].getTime() < today){
        minTime = today.getHours() + ":" + today.getMinutes()
      }
      if(i > 0){
        for(let j = i - 1; j >= 0; j--){
          if(this.state.selectedDate[j] instanceof Date && this.state.selectedDate[j].getTime() > minDate.getTime()){
            minDate = this.state.selectedDate[j]
          }
          if(this.state.selectedDate[j] instanceof Date && this.state.selectedDate[i] instanceof Date && this.state.selectedDate[j].getTime() === this.state.selectedDate[i].getTime()){
            minTime = this.state.selectedTime[j].getHours() + ":" + ("0" + this.state.selectedTime[j].getMinutes()).slice(-2)
          }
        }
      }



      inputLegs.push(
        <Inputs
          key={i}
          id={i}
          dateValue={this.state.selectedDate[i]}
          timeValue={this.state.selectedTime[i]}
          minDate = {minDate}
          minTime={minTime}
          destination={destination[i]}
          origin={origin[i]}
          onClickDate={this.handleDateSelect}
          onClickTime={this.handleTimeSelect}
          onDestinationChange={this.handleDestinationInput}
          onOriginChange={this.handleOriginInput}
          onSwap={this.handleSwap}
          onDelete={this.deleteLeg}
          deleteOption={deleteOpt}
        />
      );
    }

    return (
      <main>
        <div id="search-journey">
          <h1 id="title">Search journey</h1>
          <div id="card">
            <ul id="errors">
            {this.state.errors.map((d, i) => {
              return (
                <li key={i}>{d}</li>
              )
            })}
            </ul>
            <form onSubmit={this.handleSubmit}>
            <div id="settings">
              <ul>
                <li><select value={this.state.journeyType} onChange={this.handleJourneyTypeChange}>
                  <option value="0">One-way</option>
                  <option value="1">Return</option>
                  <option value="2">Multi-leg</option>
                </select></li>
                <li><select defaultValue={1} ref={this.adults}>
                  <option value="0">0 Adults</option>
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5 Adults</option>
                </select></li>
                <li><select defaultValue={0} ref={this.children}>
                  <option value="0">0 Children</option>
                  <option value="1">1 Child</option>
                  <option value="2">2 Children</option>
                  <option value="3">3 Children</option>
                  <option value="4">4 Children</option>
                  <option value="5">5 Children</option>
                </select></li>
                <li><select ref={this.railcards}>
                  <option>Railcard</option>
                  <option value="YNG">16-25 Railcard</option>
                  <option value="TST">26-30 Railcard</option>
                  <option value="SRN">Senior Railcard</option>
                  <option value="FAM">Family and Friends Railcard</option>
                  <option value="2TR">Two Together Railcard</option>
                  <option value="NEW">Network Railcard</option>
                  <option value="DIS">Disabled Persons Railcard</option>
                </select></li>
              </ul>
              <div id="option-container">
                <div className="option">
                  <input id="TDA" ref={this.stepFree} type="checkbox" />
                  <label htmlFor="TDA"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheelchair" className="svg-inline--fa fa-wheelchair fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"></path></svg></label>
                </div>
                <div className="option">
                  <input id="SFA" ref={this.deptAssistance} type="checkbox" />
                  <label htmlFor="SFA"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hands-helping" className="svg-inline--fa fa-hands-helping fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"></path></svg></label>
                </div>
              </div>
            </div>

            <div id="search">
              <div ref={this.loading} className="loading-journey">
                <div className="loading-animation">Loading</div>
              </div>
              {inputLegs}
              {legs < 3 && journeyType === 2? <input onClick={this.addLeg} className="search-form-buttons" value="+ add another leg" type="button"/>: ""}
              <input type="submit" value="Search!"/>
            </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
