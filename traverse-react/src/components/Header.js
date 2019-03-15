import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logIn, logOut } from "../actions/actionCreators";

const Header = function(props){
    let loginField = null;
    if(props.logged){
        loginField = <div>{props.username}<button onClick={onLogoutClick}>X</button></div>
    } else{
        loginField = <Login onLogin={onLoginClick}/>
    }

    function onLogoutClick(){
        props.dispatch(logOut())
    }

    function onLoginClick(username){
        props.dispatch(logIn(username))
    }
    return (
        <header>
            <div id="menu">
                <h2><Link to="">Traverse</Link></h2>
                <ul>
                    <li><Link to="/search-journey">search journey</Link></li>
                    <li><Link to="/restriction-codes">look-up restriction codes</Link></li>
                </ul>
            </div>
            {loginField}
        </header>
    );
}



function mapStateToProps(state){
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Header)
