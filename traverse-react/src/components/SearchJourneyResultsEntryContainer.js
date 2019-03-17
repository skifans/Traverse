import React, {Component} from 'react';
import Entry from './SearchJourneyResultsEntry.js';

export default class SearchJourneyResultsEntryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: this.props.routes,
            handleClick: this.props.handleClick,
            isStepFree: this.props.isStepFree,
            hasDeptAssistance: this.props.hasDeptAssistance
        }

        console.log(this.props);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            routes: nextProps.routes,
            isStepFree: nextProps.isStepFree,
            hasDeptAssistance: nextProps.hasDeptAssistance
        });  
    }
    
    render() {

        let entries = [];
        for (let i = 0; i < this.state.routes.routes.length; i++) {
            entries.push(
                <Entry 
                    key={i}
                    crsOrigin={this.state.routes.origin.crs}
                    crsDestination={this.state.routes.destination.crs}
                    entryNumber={i}
                    isStepFree={this.state.isStepFree}
                    hasDeptAssistance={this.state.hasDeptAssistance}
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
