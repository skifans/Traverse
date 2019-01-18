import React,{Component} from 'react';

export default class Header extends Component{
  render(){
    return(
      <div id="navbar">
        <div id="logo">
          <img src="images/traverselogo2.png" alt="Logo" height="90" width="270"/>
        </div>

        <div id="nav-links">
          <ul>
            <li><a href="/">Link 4</a></li>
            <li><a href="/">Link 3</a></li>
            <li><a href="/">Link 2</a></li>
            <li><a href="/">Link 1</a></li>
          </ul>
        </div>
    </div>

    )
  }
}
