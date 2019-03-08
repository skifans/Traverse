import React, {Component} from 'react';
import Entry from './SearchJourneyResultsEntry.js';

export default class SearchJourneyResultsEntryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: this.props.routes,
            handleClick: this.props.handleClick
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ routes: nextProps.routes });  
    }
    
    render() {

        let entries = [];
        for (let i = 0; i < this.state.routes.routes.length; i++) {
            entries.push(
                <Entry 
                    key={i}
                    crsOrigin={this.state.routes.origin.crs}
                    crsDestination={this.state.routes.destination.crs}
                    routes={this.state.routes.routes[i]}
                    handleClick={this.state.handleClick}
                />
            );
        }

        return (
            <div className="entries" >
                {entries}
             </div>
        );
        
    }
};
