import React, {Component} from 'react';
import Entries from './SearchJourneyResultsEntryContainer.js';
import Entry from './SearchJourneyResultsEntry.js';
import LegContainer from './SearchJourneyResultsLegContainer.js';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const journeyTypes = ["One-way", "Return", "Multi-leg"];
const railcards = {
    YNG: '16-25',
    TST: '26-30',
    SNR: 'Senior',
    FAM: 'Family and Friends',
    '2TR': 'Two Together',
    NEW: 'Network',
    DIS: 'Disabled Persons'
}

export default class SearchJourneyResults extends Component{
    constructor(props){
        super(props)
        this.inputData = props.location.state.data;
        this.dataReceived = props.location.state.dataReceived;

        this.passengerCount = parseInt(this.inputData.adults) + parseInt(this.inputData.children);

        let origin = this.dataReceived[0].routes.routes[0].routeParts[0].origin;
        let length = this.dataReceived[0].routes.routes[0].routeParts.length-1;
        let destination = this.dataReceived[0].routes.routes[0].routeParts[length].destination;

        let date = this.inputData.legs[0].datetime;
        let stringDate = "";

        this.state = {
            currentLeg: 0,
            origin: origin,
            destination: destination,
            date: date,
            selectedRoutes: []
        };

        console.log(this.dataReceived);

        this.handleEntrySelection = this.handleEntrySelection.bind(this)

    }

    

    handleEntrySelection(e){
        const {inputData, dataReceived} = this;
        let leg = this.state.currentLeg;

        let currentRoutes = this.state.selectedRoutes;
        currentRoutes.push(
            {
                key: leg,
                dateString: this.stringDate,
                crsOrigin: this.dataReceived[leg].routes.origin.crs,
                crsDestination: this.dataReceived[leg].routes.destination.crs,
                entryNumber: e.target.name,
                isStepFree: this.dataReceived[leg].isStepFree,
                hasDeptAssistance: this.dataReceived[leg].hasDeptAssistance,
                routes : this.dataReceived[leg],
            }
        );

        leg++;

        this.setState({selectedRoutes: currentRoutes});

        console.log(this.dataReceived, leg);

        if (this.state.currentLeg < inputData.legs.length - 1) {


            let origin = dataReceived[leg].routes.routes[0].routeParts[0].origin;
            let length = dataReceived[leg].routes.routes[0].routeParts.length-1;
            let destination = dataReceived[leg].routes.routes[0].routeParts[length].destination;
            
            let date = inputData.legs[leg].datetime

            this.setState({ currentLeg: leg, origin, destination, date});
        } else {
            this.setState({ currentLeg: leg});
        }


    }
  
    render(){
        const { date, origin, destination, currentLeg} = this.state;
        this.stringDate =  daysOfWeek[date.getDay()] + ", " + date.getDate() + " " + monthsOfYear[date.getMonth()];
        const {passengerCount} = this;

        let passengers = passengerCount + " passenger";
        if (passengerCount > 1) passengers += 's';

        const stepFree = (
            <div className="option">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheelchair" className="svg-inline--fa fa-wheelchair fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"></path></svg>
            </div>
        );

        const deptAssistance = (
            <div className="option">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hands-helping" className="svg-inline--fa fa-hands-helping fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"></path></svg>
            </div>
        );

        const optionsContainer = (
            <div id="options-container">
                {this.inputData.options.stepFree ? stepFree : ""}
                {this.inputData.options.deptAssistance ? deptAssistance : ""}
            </div>
        );


        let results = "";


        if (this.state.currentLeg === this.inputData.legs.length) {
            let entries = [];
            let routeAmount = this.state.selectedRoutes.length;
            for (let i = 0; i < routeAmount; i++) {
                let origin = this.dataReceived[i].routes.routes[0].routeParts[0].origin;
                let length = this.dataReceived[i].routes.routes[0].routeParts.length-1;
                let destination = this.dataReceived[i].routes.routes[0].routeParts[length].destination;
                entries.push(
                    <React.Fragment>
                        <div className="summary-text" >
                            <p key={routeAmount + i}> {origin} - {destination} </p>
                            <span>{ this.state.selectedRoutes[i].dateString }</span>
                        </div>
                        <Entry
                            key={i}
                            crsOrigin={this.state.selectedRoutes[i].routes.routes.origin.crs}
                            crsDestination={this.state.selectedRoutes[i].routes.routes.destination.crs}
                            entryNumber={i}
                            isStepFree={this.state.selectedRoutes[i].isStepFree}
                            hasDeptAssistance={this.state.selectedRoutes[i].hasDeptAssistance}
                            routes={this.state.selectedRoutes[i].routes.routes.routes[this.state.selectedRoutes[i].entryNumber]}
                            handleClick={undefined}
                        />
                    </React.Fragment>
                );
            }

            results = (
                <div id="results">
                    <h3>Selected journeys</h3>
                    <div className="entries">
                        {entries}
                    </div>
                    <input id="search-again-button" type="button" value="Search again" onClick={() => this.props.history.push(`/search-journey`)} />
                </div>
            );


        } else {

            let stepFreeStatus = this.dataReceived[currentLeg].isStepFree;
            //console.log(this.inputData.options.isStepFree);
            if (this.inputData.options.isStepFree) {
                
                stepFreeStatus = undefined;
            }

            let deptAssistanceStatus = this.dataReceived[currentLeg].hasDeptAssistance;
            //console.log(this.inputData.options.deptAssistance);
            if (!this.inputData.options.deptAssistance) {
                
                deptAssistanceStatus = undefined;
            }

            results = (
                <React.Fragment>
                    <div id="details">
                        <LegContainer leg={currentLeg} dataReceived={this.dataReceived} selectedRoutes={this.state.selectedRoutes} />
                        <div id="main">
                            <p>{ origin } <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg> { destination }</p>
                            <span>{ this.stringDate }</span>
                            <div id="price">
                                <p>
                                    Average adult price: £{
                                        Math.round(
                                            this.dataReceived[currentLeg].fares.fares.reduce((sum, fare) => {
                                                return sum + fare.adultPrice;
                                            }, 0) / 100 / this.dataReceived[currentLeg].fares.fares.length
                                            * 100) / 100
                                    }
                                </p>
                                <div id="modal">
                                    <table>
                                        <thead>
                                            <tr id="main-title" >
                                                <th colSpan="4">Available fares</th>
                                            </tr>
                                            <tr>
                                                <th>Ticket Type</th>
                                                <th>Restriction Code</th>
                                                <th>Adult Price</th>
                                                <th>Child Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.dataReceived[currentLeg].fares.fares.map( (fare, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{fare.code}</td>
                                                        <td>{fare.restrictionCode}</td>
                                                        <td>{"£" + (fare.adultPrice/100)}</td>
                                                        <td>{"£" + (fare.childPrice/100)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="results">
                        <h3>Recommended journeys</h3>
                        <Entries 
                            routes={this.dataReceived[currentLeg].routes} 
                            handleClick={this.handleEntrySelection}
                            isStepFree={stepFreeStatus}
                            hasDeptAssistance={deptAssistanceStatus} 
                        />
                    </div>
                </React.Fragment>
            );

        }



        return (
            <main>
                <div id="search-results">
                <div id="settings">
                    <ul>
                        <li>{ journeyTypes[this.inputData.journeyType]}</li>
                        <li>{ passengers }</li>
                        <li>{ railcards[this.inputData.railcards] || 'No' } Railcard</li>
                    </ul>
                    {this.inputData.options.stepFree || this.inputData.options.deptAssistance ? optionsContainer : ""}
                </div>
                {results}
            </div>
            </main>
        );
    }
}
