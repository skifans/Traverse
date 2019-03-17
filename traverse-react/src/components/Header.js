import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logIn, logOut } from "../actions/actionCreators";
import { FirebaseContext } from './Firebase'

const LoggedField = function(props){
    function signOut(){
        console.log(props);
        props.firebase.doSignOut()
        props.dispatch(logOut())
    }

    return(
        <div id="logged-in">
            <img src="images/profile.png" alt="Profile" />
            <div id="main">
                <p>{props.username}</p>
                <button className="button" id="account-button"><Link to="/profile">View account</Link></button>
                <button className="button" id="signout-button" onClick={signOut} >Sign out</button>
            </div>
        </div>
    )
}

const Header = function(props){
    function getField(firebase){
        if(props.logged){
            return <LoggedField {...props} username={props.username} firebase={firebase}/>
        } else{
            return <Login firebase={firebase} onLogin={onLoginClick}/>
        }
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
            <FirebaseContext.Consumer>{(firebase) => getField(firebase)}</FirebaseContext.Consumer>
        </header>
    );
}



function mapStateToProps(state){
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Header)
