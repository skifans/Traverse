import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';

let timeoutId = null;

class Autosuggestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value,
            suggestions: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== this.state.value){
            this.setState({value: nextProps.value})
        }
    }

    onChange = (e, {newValue}) =>{
        this.setState({
            value: newValue
        })
    }
    render() {
        let inputProps = {
            value: this.state.value,
            onChange: this.onChange,
            placeholder: this.props.placeholder
        }
        const onSuggestionsFetchRequested = ({value}) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fetch('/api/crs-lookup/' + value, {method: "GET"}).then(res => res.json()).then(data => {
                    this.setState({suggestions: data.slice(0,5)})
                });
            }, 200);
        };
        const onSuggestionsClearRequested = () => {
            this.setState({
                suggestions: []
            });
        };
        const getSuggestionValue = (suggestion) => {
            this.props.onChange(suggestion)
            //return suggestion.stationName
        }
        const renderSuggestion = suggestion => (
            <span>{suggestion.stationName} [{suggestion.crs}]</span>
        )
        return (
            <Autosuggest
                inputProps={inputProps}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
            />
        )
    }
};

export default Autosuggestion;