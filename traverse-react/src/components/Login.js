import React, {Component} from 'react';


export default class Login extends Component{
  constructor(props) {
      super(props);

      this.state = {
        selected: 0,
        loginEmail: "",
        loginPassword: "",
        signupUsername: "",
        signupPassword: "",
        forgotEmail: "",
        error: null,
      }

      this.handleLogin = this.handleLogin.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSignup = this.handleSignup.bind(this)
      this.handleReset = this.handleReset.bind(this)
  }



  handleLogin(e) {
      e.preventDefault();
      const {loginEmail, loginPassword} = this.state
      this.props.firebase
          .doSignInWithEmailAndPassword(loginEmail, loginPassword)
          .then(authUser => {
            this.props.onLogin(authUser.user.email)
          }).catch(error =>{
            this.setState({error: error.message})
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
              this.setState({error: error.message})
          })
  }

  isInvalid(method){
    switch (method) {
        case "signup":
            const {signupUsername, signupPassword} = this.state
            return signupUsername === "" || signupPassword === "";

        case "forgot":
            const {forgotEmail } = this.state
            return forgotEmail === "" || !forgotEmail.includes("@");

        case "login":
            const {loginEmail, loginPassword} = this.state
            return loginEmail === "" || loginPassword === ""
        default:
            return true
    }
  }

  handleReset(e){
      e.preventDefault()
      this.props.firebase.doPasswordReset(this.state.forgotEmail).then(() =>{
          this.setState({selected: 0, loginEmail: this.state.forgotEmail, error: null})
      }).catch(error =>{
          this.setState({error: error.message})
      })
  }

  handleChange(e){
    e.persist()
    this.setState({errorVisable: {display: "none"}});
    this.setState((prevState) =>{
      return {
        ...prevState, [e.target.name]: e.target.value
      }
    })
  }

  render(){
    const { error} = this.state

    const errDiv = () =>{
        let visible = error ? "block": "none"
        return (<div style={{"display": visible}} id="error-modal" >{ error }</div>)
    }

    if (this.state.selected === 0) {
        let disable = this.isInvalid("login")
        return (
        <div id="login">
        <form onSubmit={this.handleLogin}>
          <input type="image" src="/images/login.png" alt="Login button" disabled={disable}/>
          <div id="email">
            <input onChange={this.handleChange} value={this.state.loginEmail} type="text" placeholder="email" name="loginEmail"/>
            {errDiv()}
          </div>
          <input onChange={this.handleChange} type="password" name="loginPassword" placeholder="password" />
        </form>
        <p>forgot your password? <span onClick={() => this.setState({ selected: 2, error: null })} >click here!</span></p>
        <p>not registered? <span onClick={() => this.setState({ selected: 1, error: null })} >sign up!</span></p>
      </div>
      );
    } else if (this.state.selected === 1) {
      let disable = this.isInvalid("signup")
      return (
      <div id="signup">
        <form onSubmit={this.handleSignup}>
            <input onChange={this.handleChange} name="signupUsername" type="text" placeholder="email" />
            <input onChange={this.handleChange} name="signupPassword" type="password" placeholder="password" />
            {errDiv()}
            <div className="cell">
            <input type="submit" value="Sign up!" disabled={disable}/>
            <p>registered? <span onClick={() => this.setState({ selected: 0, error: null })} >log in!</span></p>
          </div>
        </form>
      </div>
      );
    } else if (this.state.selected === 2) {
        let disable = this.isInvalid("forgot")
        return (
        <div id="forgot">
          <form onSubmit={this.handleReset}>
            <input onChange={this.handleChange} name="forgotEmail" type="text" placeholder="email" />
            <input type="submit" value="Send email!" disabled={disable}/>
            {errDiv()}
          </form>
          <p>registered? <span onClick={() => this.setState({ selected: 0, error: null })} >log in!</span></p>
        </div>
      );
    }
  }

}