import React, {Component} from 'react';

export default class RestrictionCodeResults extends Component{
  constructor(props){
    super(props);
    if(this.props.location.state.code != ""){
      console.log(this.props.location.state.code);
      this.state = {
        load: true,
        timer: 0
      }
    } else{
      this.state = {
        load: false
      }
    }
    this.tick = this.tick.bind(this);
  }

  tick(){
    this.setState((prevState, props) => ({
      timer: prevState.timer + 1
    }));
  }

  componentDidMount(){
    this.timer = setInterval(() =>{
      this.tick();
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  render(){
    if(this.state){
      return(
        <div style={{fontSize: "40px", marginLeft: "50%", marginTop: "30%"}}>Loading...{this.state.timer}</div>
      )
    } else {
      return (
        <div>Loaded</div>
      )
    }
  }


}
