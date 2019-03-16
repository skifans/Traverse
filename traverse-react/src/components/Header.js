import React from 'react';
import Login from './Login';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logIn, logOut } from "../actions/actionCreators";
import { FirebaseContext } from './Firebase'

const LoggedField = function(props){
    function signOut(){
        props.firebase.doSignOut()
        props.dispatch(logOut())
    }

    return(
        <div>
            <Link to="/profile">{props.username}</Link>
            <button onClick={signOut}>
                X
            </button>
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
