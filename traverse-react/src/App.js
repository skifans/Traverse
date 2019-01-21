import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import RestrictionCodeForm from './RestrictionCodeForm';
import SearchJourneyForm from './SearchJourneyForm.js';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/restriction-codes' component={RestrictionCodeForm}/>
          <Route path='/search-journey' component={SearchJourneyForm}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
