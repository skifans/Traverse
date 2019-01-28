import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component{
  render(){
    return(
  <div id="navbar">
    <div id="logo">
      <img src="../images/traverselogo3.png" alt="Logo"/>
    </div>

    <div id="nav-links">
      <ul>
        <li><a href="">Create Account</a></li>
        <li><a href="">Log In</a></li>
        <li><a href="">Help</a></li>
        <li><Link to='/restriction-codes'>Ticket Restriction Codes</Link></li>
        <li><Link to='/search-journey'>Search Journey</Link></li>
      </ul>
    </div>
  </div>

    )
  }
}
