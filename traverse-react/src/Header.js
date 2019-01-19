import React,{Component} from 'react';

export default class Header extends Component{
  render(){
    return(
  <div id="navbar">
    <div id="logo">
      <img src="images/traverselogo3.png" alt="Logo"/>
    </div>
    
    <div id="nav-links">
      <ul>
        <li><a href="">Create Account</a></li>
        <li><a href="">Log In</a></li>
        <li><a href="">Help</a></li>
        <li><a href="">Ticket Restriction Codes</a></li>
        <li><a href="">Search Journey</a></li>
      </ul>
    </div>
  </div>

    )
  }
}
