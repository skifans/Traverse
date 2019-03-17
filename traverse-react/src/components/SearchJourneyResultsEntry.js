import React, {Component} from 'react';
import Hop from './SearchJourneyResultsEntryHops.js';

export default class SearchJourneyResultsEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: this.props.routes,
            crsOrigin: this.props.crsOrigin,
            crsDestination: this.props.crsDestination,
            entryNumber: this.props.entryNumber,
            handleClick: this.props.handleClick,
            isStepFree: this.props.isStepFree,
            hasDeptAssistance: this.props.hasDeptAssistance,
            expanded: false
        }

        console.log(this.state);

        this.handleClick = this.handleClick.bind(this)
        this.extractTime = this.extractTime.bind(this)

    }


    componentWillReceiveProps(nextProps) {
        this.setState({ 
            routes: nextProps.routes, 
            crsOrigin: nextProps.crsOrigin,
            crsDestination: nextProps.crsDestination,
            isStepFree: nextProps.isStepFree,
            hasDeptAssistance: nextProps.hasDeptAssistance,
            expanded: false
        });  
    }

    handleClick = () => {
        let newState = !this.state.expanded
        this.setState({expanded: newState});
    }

    extractTime = (time) => {
        let hours = parseInt(time.slice(0, 2));
        let minutes = parseInt(time.slice(3, 5));
        if (hours > 0) {
            time = hours  + "h " + minutes  + "m";
        } else {
            time = minutes + "m";
        }
        return time;
    }
    
    
    render() {
        

        let time = this.extractTime(this.state.routes.duration);

        let hops = this.state.routes.routeParts.length - 1
        let changes = "";
        if (hops === 0) {
            changes = "No changes"
        } else if (hops === 1) {
            changes = "1 change"
        } else {
            changes = hops + " changes"
        }
        
        let detailsStyle = {}
        if (this.state.expanded) {
            detailsStyle = {
                display: "flex",
                flexDirection: "column"
            }
        }

        let parts = this.state.routes.routeParts.length;
        let hopEntries = [];
        for (let i = 0; i < parts; i++) {
            hopEntries.push(
                <Hop 
                    key={i}
                    entryNumber={this.state.entryNumber}
                    hopNumber={i}
                    routeParts={this.state.routes.routeParts}
                    handleClick = {this.state.handleClick}
                />
            );
        }


        let stepFree = "Step free access unknown";
        if (this.state.isStepFree) {
            stepFree = (parts === 1) ? "Step free access available" : "Partial step free access";
        } else if (this.state.isStepFree === undefined) {
            stepFree = "";
        } else {
            stepFree = "Step free access not available";
        }


        let support = "Support unknown";
        if (this.state.hasDeptAssistance) {
            support = (parts === 1) ? "Departure assistance available" : "Partial support available";
        } else if (this.state.hasDeptAssistance === undefined) {
            support = "";
        } else {
            support = "Departure assistance not available";
        }



        return (
        <div className="entry">
            <div className="main" onClick={ this.handleClick }>
                <div className="cell" style={{ width: "110px" }} >
                    <p>{ this.state.routes.routeParts[0].departureTime } - { this.state.routes.routeParts[this.state.routes.routeParts.length-1].arrivalTime }</p>
                    <p>{this.state.crsOrigin}-{this.state.crsDestination}</p>
                </div>
                <div className="cell" style={{ width: "70px" }} >
                    <p>{time}</p>
                </div>
                <div className="cell" style={{ width: "100px" }}>
                    <p>{changes}</p>
                </div>
                <div className="cell" style={{ width: "140px" }} >
                    <p>{stepFree}</p>
                </div>
                <div className="cell" style={{ width: "130px" }} >
                    <p>{support}</p>
                </div>
                <img src="/images/open.png" alt="Expand button"/>
            </div>
            <div className="details" style={detailsStyle}>
                {hopEntries}
            </div>
        </div>
        );
    }
};
