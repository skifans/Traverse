import React, {Component} from 'react';
import Hop from './SearchJourneyResultsEntryHops.js';

export default class SearchJourneyResultsEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: this.props.routes,
            crsOrigin: this.props.crsOrigin,
            crsDestination: this.props.crsDestination,
            handleClick: this.props.handleClick,
            expanded: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.extractTime = this.extractTime.bind(this)

    }


    componentWillReceiveProps(nextProps) {
        this.setState({ 
            routes: nextProps.routes, 
            crsOrigin: nextProps.crsOrigin,
            crsDestination: nextProps.crsDestination,
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

        let hopEntries = [];
        for (let i = 0; i < this.state.routes.routeParts.length; i++) {
            hopEntries.push(
                <Hop 
                    key={i}
                    hopNumber={i}
                    routeParts={this.state.routes.routeParts}
                    handleClick = {this.state.handleClick}
                />
            );
        }


        return (
        <div className="entry">
            <div className="main" onClick={ this.handleClick }>
                <div className="cell" style={{ width: "150px" }} >
                    <p>{ this.state.routes.routeParts[0].departureTime } - { this.state.routes.routeParts[this.state.routes.routeParts.length-1].arrivalTime }</p>
                    <p>TOC unknown</p>
                </div>
                <div className="cell" style={{ width: "70px" }} >
                    <p>{time}</p>
                    <p>{this.state.crsOrigin}-{this.state.crsDestination}</p>
                </div>
                <div className="cell" style={{ width: "85px" }}>
                    <p>Catergory unknown</p>
                    <p>{changes}</p>
                </div>
                <div className="cell" style={{ width: "150px" }} >
                    <p>Wheelchair access unknown</p>
                    <p>Support unknown</p>
                </div>
                <div className="price">
                    <p>£ XX.XX</p>
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
