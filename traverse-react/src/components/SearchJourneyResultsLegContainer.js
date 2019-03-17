import React, {Component} from 'react';
import Leg from './SearchJourneyResultsLeg.js';

export default class SearchJourneyResultsLegContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLeg: this.props.leg,
            dataReceived: this.props.dataReceived,
            selectedRoutes: this.props.selectedRoutes
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            activeLeg: nextProps.leg,
            selectedRoutes: nextProps.selectedRoutes
        });  
    }

    render() {

        const {activeLeg, dataReceived, selectedRoutes} = this.state;

        let legs = [];
        const legAmount = dataReceived.length;
        for (let i = 0; i < legAmount; i++) {
            legs.push(
                <Leg
                    key={i}
                    id={i}
                    dateString={dataReceived.dateString}
                    crsOrigin={dataReceived[i].routes.origin.crs}
                    crsDestination={dataReceived[i].routes.destination.crs}
                    route={selectedRoutes[i]}
                    choosing={i === activeLeg}
                />,
                i !== legAmount - 1 ? <div key={legAmount+i} className="triangle" /> : ""
            );

        }

        return (
            <div id="container">
                {legs}
            </div>
        );
    }

}