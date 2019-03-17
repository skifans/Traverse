import React, {Component} from 'react';
import Leg from './SearchJourneyResultsLeg.js';

const SearchJourneyResultsLegContainer = function(props){
    const {leg, dataReceived, selectedRoutes} = props;
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
                choosing={i === leg}
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


export default SearchJourneyResultsLegContainer;
