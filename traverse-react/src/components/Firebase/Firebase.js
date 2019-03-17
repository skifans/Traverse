import app from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDpyzG_rFBY6DIKjWDnLpwOEaYMMIvA0EQ",
    authDomain: "traverse-21ac8.firebaseapp.com",
    databaseURL: "https://traverse-21ac8.firebaseio.com",
    projectId: "traverse-21ac8",
    storageBucket: "traverse-21ac8.appspot.com",
    messagingSenderId: "701226750052"
};

class Firebase{
    constructor(){
        app.initializeApp(config)

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}


export default Firebase