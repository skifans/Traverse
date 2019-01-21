import React, { Component } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RestrictionCodeForm from './Components/RestrictionCodeForm';
import SearchJourneyForm from './Components/SearchJourneyForm.js';
import Main from './Components/Main';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/restriction-codes' component={RestrictionCodeForm}/>
          <Route path='/search-journey' component={SearchJourneyForm}/>
          <Route path='/' component={Main}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
