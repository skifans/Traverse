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
        console.log(nextProps);
        console.log(this.state)
        if(nextProps.value.stationName !== this.state.value.stationName){
            this.setState({value: nextProps.value})
        }
    }

    onChange = (e, {newValue, method}) =>{
        console.log(newValue, method)
        if(method === 'enter'){
            e.preventDefault();
            this.props.onChange(newValue)
        }else if(method === "click"){
            this.props.onChange(newValue)
        }else {
            this.setState({
                value: newValue
            })
        }
    }
    render() {
        let inputValue = "";
        if (this.state.value.stationName) {
            inputValue = this.state.value.stationName
        } else if (this.state.value !== "") {
            inputValue = this.state.value;
        } else{
            console.log("Something else")
        }

        let inputProps = {
            value: inputValue,
            onChange: this.onChange,
            placeholder: this.props.placeholder
        };
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
            return suggestion
        }
        const renderSuggestion = suggestion => (
            <span>{suggestion.stationName} [{suggestion.crs}]</span>
        )
        const shouldRenderSuggestion = (value) => {
            return value.length > 1
        }


        return (
            <Autosuggest
                inputProps={inputProps}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                shouldRenderSuggestions={shouldRenderSuggestion}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
            />
        )
    }
};

export default Autosuggestion;