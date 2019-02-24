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
      journeyType: 0
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
    this.handleOriginInput = this.handleOriginInput.bind(this);
    this.handleDestinationInput = this.handleDestinationInput.bind(this);
    this.handleSwap = this.handleSwap.bind(this);
    this.addLeg = this.addLeg.bind(this);
    this.deleteLeg = this.deleteLeg.bind(this);
    this.handleJourneyTypeChange = this.handleJourneyTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)

    this.bikeStorageTrain = React.createRef();
    this.bikeStorageStn = React.createRef();
    this.deptAssistance = React.createRef();
    this.stepFree = React.createRef();
    this.adults = React.createRef();
    this.children = React.createRef();
    this.railcards = React.createRef();
  }


  handleSubmit(e){
    e.preventDefault();
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
    let datetime = this.state.selectedDate.map((d, i) => {
      let time = this.state.selectedTime[i]
      if(time){
        return new Date(d.getTime() + time.getTime() - today)
      } else{
        return d
      }
    })
    console.log(datetime)
    let legs = []
    for(let i = 0; i < this.state.legs; i++){
      legs.push({origin: this.state.origin[i].crs, destination: this.state.destination[i].crs, datetime: datetime[i]})
    }

    let data = {
      legs: legs,
      adults: this.adults.current.value,
      children: this.children.current.value,
      railcards: this.railcards.current.value,
      options: {
        stepFree: this.stepFree.current.checked,
        deptAssistance: this.deptAssistance.current.checked,
        bikeStorageStn: this.bikeStorageStn.current.checked,
        bikeStorageTrain: this.bikeStorageTrain.current.checked
      }
    };
    console.log(data)
    fetch('/api/search-journey', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(data => console.log(data))
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
          selectedDate: prevState.selectedDate.concat([""]),
          selectedTime: prevState.selectedTime.concat([""]),
          destination: prevState.destination.concat([""]),
          origin: prevState.origin.concat([""])
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
    if(this.state.legs === 1){
      this.setState({journeyType: +e.target.value})
    } else{
      let val = +e.target.value
      this.setState((prevState) =>{
        return {
          selectedDate: [...prevState.selectedDate].splice(0),
          origin: [...prevState.origin].splice(0),
          destination: [...prevState.destination].splice(0),
          legs: 1,
          journeyType: val
        }
      })
    }
  }


  render() {
    // TODO: implement journey legs in new UI
    const { origin, destination, legs, journeyType } = this.state;
    const deleteOpt = legs > 1;

    let inputLegs = [];
    for(let i = 0; i < legs; i++) {
      inputLegs.push(
        <Inputs
          key={i}
          id={i}
          dateValue={this.state.selectedDate[i]}
          timeValue={this.state.selectedTime[i]}
          destination={destination[i].stationName}
          origin={origin[i].stationName}
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
            <form onSubmit={this.handleSubmit}>
            <div id="settings">
              <ul>
                <li><select onChange={this.handleJourneyTypeChange}>
                  <option value="0">One-way</option>
                  <option selected="selected" value="1">Return</option>
                  <option value="2">Multi-leg</option>
                </select></li>
                <li><select ref={this.adults}>
                  <option value="0">0 Adults</option>
                  <option selected="selected" value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">5 Adults</option>
                </select></li>
                <li><select ref={this.children}>
                  <option value="0">0 Children</option>
                  <option value="1">1 Child</option>
                  <option value="2">2 Children</option>
                  <option value="3">3 Children</option>
                  <option value="4">4 Children</option>
                  <option value="5">5 Children</option>
                </select></li>
                <li><select ref={this.railcards}>
                  <option>Railcard</option>
                  <option value="STT">16-25 Railcard</option>
                  <option value="TST">26-30 Railcard</option>
                  <option value="SRC">Senior Railcard</option>
                  <option value="FFR">Family and Friends Railcard</option>
                  <option value="TTR">Two Together Railcard</option>
                  <option value="NRC">Network Railcard</option>
                  <option value="DPR">Disabled Persons Railcard</option>
                </select></li>
              </ul>
              <div id="option-container">
                <div className="option">
                  <input id="TDA" ref={this.deptAssistance} type="checkbox" />
                  <label for="TDA"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheelchair" className="svg-inline--fa fa-wheelchair fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"></path></svg></label>
                </div>
                <div className="option">
                  <input id="SFA" ref={this.stepFree} type="checkbox" />
                  <label for="SFA"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hands-helping" className="svg-inline--fa fa-hands-helping fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"></path></svg></label>
                </div>
                <div className="option">
                  <input id="BST" ref={this.bikeStorageTrain} type="checkbox" />
                  <label for="BST"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bicycle" className="svg-inline--fa fa-bicycle fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M512.509 192.001c-16.373-.064-32.03 2.955-46.436 8.495l-77.68-125.153A24 24 0 0 0 368.001 64h-64c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h50.649l14.896 24H256.002v-16c0-8.837-7.163-16-16-16h-87.459c-13.441 0-24.777 10.999-24.536 24.437.232 13.044 10.876 23.563 23.995 23.563h48.726l-29.417 47.52c-13.433-4.83-27.904-7.483-42.992-7.52C58.094 191.83.412 249.012.002 319.236-.413 390.279 57.055 448 128.002 448c59.642 0 109.758-40.793 123.967-96h52.033a24 24 0 0 0 20.406-11.367L410.37 201.77l14.938 24.067c-25.455 23.448-41.385 57.081-41.307 94.437.145 68.833 57.899 127.051 126.729 127.719 70.606.685 128.181-55.803 129.255-125.996 1.086-70.941-56.526-129.72-127.476-129.996zM186.75 265.772c9.727 10.529 16.673 23.661 19.642 38.228h-43.306l23.664-38.228zM128.002 400c-44.112 0-80-35.888-80-80s35.888-80 80-80c5.869 0 11.586.653 17.099 1.859l-45.505 73.509C89.715 331.327 101.213 352 120.002 352h81.3c-12.37 28.225-40.562 48-73.3 48zm162.63-96h-35.624c-3.96-31.756-19.556-59.894-42.383-80.026L237.371 184h127.547l-74.286 120zm217.057 95.886c-41.036-2.165-74.049-35.692-75.627-76.755-.812-21.121 6.633-40.518 19.335-55.263l44.433 71.586c4.66 7.508 14.524 9.816 22.032 5.156l13.594-8.437c7.508-4.66 9.817-14.524 5.156-22.032l-44.468-71.643a79.901 79.901 0 0 1 19.858-2.497c44.112 0 80 35.888 80 80-.001 45.54-38.252 82.316-84.313 79.885z"></path></svg></label>
                </div>
                <div className="option">
                  <input id="BSS" ref={this.bikeStorageStn} type="checkbox" />
                  <label for="BSS"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bicycle" className="svg-inline--fa fa-bicycle fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M512.509 192.001c-16.373-.064-32.03 2.955-46.436 8.495l-77.68-125.153A24 24 0 0 0 368.001 64h-64c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h50.649l14.896 24H256.002v-16c0-8.837-7.163-16-16-16h-87.459c-13.441 0-24.777 10.999-24.536 24.437.232 13.044 10.876 23.563 23.995 23.563h48.726l-29.417 47.52c-13.433-4.83-27.904-7.483-42.992-7.52C58.094 191.83.412 249.012.002 319.236-.413 390.279 57.055 448 128.002 448c59.642 0 109.758-40.793 123.967-96h52.033a24 24 0 0 0 20.406-11.367L410.37 201.77l14.938 24.067c-25.455 23.448-41.385 57.081-41.307 94.437.145 68.833 57.899 127.051 126.729 127.719 70.606.685 128.181-55.803 129.255-125.996 1.086-70.941-56.526-129.72-127.476-129.996zM186.75 265.772c9.727 10.529 16.673 23.661 19.642 38.228h-43.306l23.664-38.228zM128.002 400c-44.112 0-80-35.888-80-80s35.888-80 80-80c5.869 0 11.586.653 17.099 1.859l-45.505 73.509C89.715 331.327 101.213 352 120.002 352h81.3c-12.37 28.225-40.562 48-73.3 48zm162.63-96h-35.624c-3.96-31.756-19.556-59.894-42.383-80.026L237.371 184h127.547l-74.286 120zm217.057 95.886c-41.036-2.165-74.049-35.692-75.627-76.755-.812-21.121 6.633-40.518 19.335-55.263l44.433 71.586c4.66 7.508 14.524 9.816 22.032 5.156l13.594-8.437c7.508-4.66 9.817-14.524 5.156-22.032l-44.468-71.643a79.901 79.901 0 0 1 19.858-2.497c44.112 0 80 35.888 80 80-.001 45.54-38.252 82.316-84.313 79.885z"></path></svg></label>
                </div>
              </div>
            </div>

            <div id="search">
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
