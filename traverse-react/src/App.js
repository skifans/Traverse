import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import RestrictionCodeForm from './RestrictionCodeForm';
import SearchJourneyForm from './SearchJourneyForm.js';
import Main from './Main';
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
