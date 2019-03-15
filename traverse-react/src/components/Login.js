import React, {Component} from 'react';
import { Link } from 'react-router-dom';


export default class Login extends Component{
  constructor(props) {
      super(props);

      this.state = {
        selected: 0,
        login: {
          username: "",
          password: ""
        }
      }

      this.handleLogin = this.handleLogin.bind(this);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
  }



  handleLogin(e) {
      e.preventDefault();

      this.props.onLogin(this.state.login.username)
  }
  handleLoginChange(e){
    e.persist()
    this.setState((prevState)=>{
      console.log(prevState)
      return {
        login: {...prevState.login, username: e.target.value}
      }
    })
  }
  handleLoginPasswordChange(e){
    e.persist()
    this.setState((prevState)=>{
      console.log(prevState)
      return {
        login: {...prevState.login, password: e.target.value}
      }
    })
  }
  
  render(){
    console.log(this.state)
    if (this.state.selected === 0) {
      return (
        <div id="login">
        <form onSubmit={this.handleLogin}>
          <input type="image" src="/images/login.png" alt="Login button"/>
          <input onChange={this.handleLoginChange} type="text" placeholder="email"  defaultValue="" />
          <input onChange={this.handleLoginPasswordChange} type="password" placeholder="password" />
        </form>
        <p>forgot your password? <span onClick={() => this.setState({ selected: 2 })} >click here!</span></p>
        <p>not registered? <span onClick={() => this.setState({ selected: 1 })} >sign up!</span></p>
      </div>
      );
    } else if (this.state.selected === 1) {
      return (
      <div id="signup">
        <form>
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
          <div className="cell">
            <input type="button" value="Sign up!" />
            <p>registered? <span onClick={() => this.setState({ selected: 0 })} >log in!</span></p>
          </div>
        </form>
      </div>
      );
    } else if (this.state.selected === 2) {
      return (
        <div id="forgot">
          <form>
            <input type="text" placeholder="email" />
            <input type="button" value="Send email!" />
          </form>
          <p>registered? <span onClick={() => this.setState({ selected: 0 })} >log in!</span></p>
        </div>
      );
    } else {
      return (<p>????</p>);
    }
  }

}