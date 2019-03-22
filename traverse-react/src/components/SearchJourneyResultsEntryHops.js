import React, {Component} from 'react';

export default class SearchJourneyResultsEntryHops extends Component {
    constructor(props) {
        super(props);

        this.extractTime = this.extractTime.bind(this)

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

        let waiting = "";
        if (this.props.routeParts[this.props.hopNumber].waitDuration !== undefined) {
            waiting = (
                <div className="wait">
                    <p>Time to change: {this.extractTime(this.props.routeParts[this.props.hopNumber].waitDuration)}</p>
                </div>
            );
        }

        let bottom = "";
        if (this.props.handleClick !== undefined) {
            bottom = (
                <div className="hopBottom">
                    <input type="button" value="Select" name={this.props.entryNumber} onClick={this.props.handleClick} />
                </div>
            );
        }

        return (
            <div className="hop">
                <div className="travel">
                    <img src="/images/train-solid.svg" alt="Train"/>
                    <div>
                        <p>Departure at {this.props.routeParts[this.props.hopNumber].departureTime} from {this.props.routeParts[this.props.hopNumber].origin}</p>
                        <p>Travel time: {this.extractTime(this.props.routeParts[this.props.hopNumber].duration)}</p>
                        <p>Arrival at {this.props.routeParts[this.props.hopNumber].arrivalTime} to {this.props.routeParts[this.props.hopNumber].destination}</p>
                    </div>
                </div>
                { this.props.hopNumber !== this.props.routeParts.length - 1 ? waiting : bottom }
            </div>
        );
    }
};
