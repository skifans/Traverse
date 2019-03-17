import React, {Component} from 'react';
import { Link } from 'react-router-dom';


export default class Login extends Component{
  constructor(props) {
      super(props);

      this.state = {
        selected: 0,
        loginUsername: "",
        loginPassword: "",
        signupUsername: "",
        signupPassword: ""
      }

      this.handleLogin = this.handleLogin.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSignup = this.handleSignup.bind(this)
  }



  handleLogin(e) {
      e.preventDefault();
      const {loginUsername, loginPassword} = this.state
      this.props.firebase
          .doSignInWithEmailAndPassword(loginUsername, loginPassword)
          .then(authUser => {
            this.props.onLogin(authUser.user.email)
          }).catch(error =>{
            console.log(error)
            //TODO Implement error handling
      })

  }

  handleSignup(e){
      e.preventDefault()
      const {signupUsername, signupPassword} = this.state
      this.props.firebase
          .doCreateUserWithEmailAndPassword(signupUsername, signupPassword)
          .then(authUser => {
            this.props.onLogin(authUser.user.email)
          }).catch(error => {
            //TODO Implement error handlings
      })
  }

  isInvalid(method){
    switch (method) {
      case "signup":
        const {signupUsername, signupPassword} = this.state
        if(
            signupUsername === "" || signupPassword === ""
        ){
          return true
        }
        return false
    }
  }

  handleChange(e){
    e.persist()
    this.setState((prevState) =>{
      return {
        ...prevState, [e.target.name]: e.target.value
      }
    })
  }

  render(){
    if (this.state.selected === 0) {
      return (
        <div id="login">
        <form onSubmit={this.handleLogin}>
          <input type="image" src="/images/login.png" alt="Login button"/>
          <input onChange={this.handleChange} type="text" placeholder="email" name="loginUsername" defaultValue="" />
          <input onChange={this.handleChange} type="password" name="loginPassword" placeholder="password" />
        </form>
        <p>forgot your password? <span onClick={() => this.setState({ selected: 2 })} >click here!</span></p>
        <p>not registered? <span onClick={() => this.setState({ selected: 1 })} >sign up!</span></p>
      </div>
      );
    } else if (this.state.selected === 1) {
      let disable = this.isInvalid("signup")
      return (
      <div id="signup">
        <form onSubmit={this.handleSignup}>
            <input onChange={this.handleChange} name="signupUsername" type="text" placeholder="email" />
            <input onChange={this.handleChange} name="signupPassword" type="password" placeholder="password" />
          <div className="cell">
            <input type="submit" value="Sign up!" disabled={disable}/>
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
    }
  }

}