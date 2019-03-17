import React, {Component} from 'react';


export default class SearchJourneyResultsLeg extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id + 1,
            crsOrigin: this.props.crsOrigin,
            crsDestination: this.props.crsDestination,
            route: this.props.route,
            choosing: this.props.choosing,
            chosen: false
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            choosing: nextProps.choosing,
            route: nextProps.route
        });  
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

        const { id, crsOrigin, crsDestination, route, choosing, chosen } = this.state;
        console.log(id, route);

        if (chosen) {

            let hops = route.routes.routes.routes[route.entryNumber].routeParts.length - 1
            let changes = "";
            if (hops === 0) {
                changes = "No changes"
            } else if (hops === 1) {
                changes = "1 change"
            } else {
                changes = hops + " changes"
            }

            let departureTime = route.routes.routes.routes[route.entryNumber].routeParts[0].departureTime;
            let arrivalTime = route.routes.routes.routes[route.entryNumber].routeParts[route.routes.routes.routes[route.entryNumber].routeParts.length - 1].arrivalTime;

            return (
                <div className="container">
                    <div className="leg active">
                        <div className="leg-header">
                            <div className="circle" >{id}</div>
                            <p>{crsOrigin} → {crsDestination}</p>
                        </div>
                        <div>
                            <span className="circle small"></span>
                            <p>
                            {departureTime} - {arrivalTime}
                            </p>
                            <span style={{margin: "0px 20px 0px auto"}} >{this.extractTime(route.routes.routes.routes[route.entryNumber].duration)}</span>
                        </div>
                        <div>
                            <span className="circle small"></span>
                            <p>{route.dateString}</p>
                        </div>
                        <div>
                            <span className="circle small"></span>
                            <p>{changes}</p>
                        </div>
                    </div>
                </div>
            );
        } else if(choosing) {
            // State changed like this to not rerender the component
            this.state.chosen = true;
            return (
                <div className="leg active">
                    <div className="leg-header">
                        <div className="circle" >{id}</div>
                        <p>{crsOrigin} → {crsDestination}</p>
                    </div>
                    <div>
                        <span className="circle small"></span>
                        <p>Please choose your journey below</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="leg">
                    <div className="circle" style={{marginTop: "20px"}}>{id}</div>
                    <p>{crsOrigin} → {crsDestination}</p>
                </div>
            );
        }
    }

}