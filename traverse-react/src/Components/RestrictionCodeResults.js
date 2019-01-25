import React, {Component} from 'react';

export default class RestrictionCodeResults extends Component{
  constructor(props){
    super(props);
    if(this.props.location.state.code != ""){
      console.log(this.props.location.state.code);
      this.state = {
        load: true,
      }
    } else{
      this.state = {
        load: false
      }
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
  }

  render(){
    if(this.state){
      return(
        <div className="loading-animation">Loading</div>
      )
    } else {
      return (
        <div>Loaded</div>
      )
    }
  }


}
