import React, {Component} from 'react';
import { Link } from 'react-router-dom';

/*

Initital implementation. Out of scope though


const loginFields = (
  <div id="login">
    <form>
        <input type="image" src="images/login.png" />
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
    </form>
    <p>not registered? <span onClick={() => alert("")} >sign up!</span></p>
  </div>
);

const signupFields = (
    <div id="signup">
      <form>
          <input type="image" src="images/login.png" />
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
      </form>
      <p>registered? <span>log in!</span></p>
  </div>
);

const forgotFields = (
    <div id="login">
      <form>
          <input type="image" src="images/login.png" />
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
      </form>
      <p>not registered? <span>sign up!</span></p>
  </div>
);
*/

export default class Login extends Component{
  constructor(props) {
      super(props);

      this.state = {
        selected: 0
      }

      this.handleLogin = this.handleLogin.bind(this);

  }

  handleLogin(e) {

    e.preventDefault();

    //TODO: Make this work...
    this.props.history.push('/profile');

  }
  
  render(){
    if (this.state.selected == 0) {
      return (
        <div id="login">
        <form>
          <Link to="/profile"><input type="image" src="/images/login.png"/></Link>
          <input type="text" placeholder="email" value="" />
          <input type="password" placeholder="password" />
        </form>
        <p>forgot your password? <span onClick={() => this.setState({ selected: 2 })} >click here!</span></p>
        <p>not registered? <span onClick={() => this.setState({ selected: 1 })} >sign up!</span></p>
      </div>
      );
    } else if (this.state.selected == 1) {
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
    } else if (this.state.selected == 2) {
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