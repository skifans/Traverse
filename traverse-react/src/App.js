import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RestrictionCodeForm from './components/RestrictionCodeForm';
import RestrictionCodeResults from './components/RestrictionCodeResults';
import SearchJourneyForm from './components/SearchJourneyForm.js';
import SearchJourneyResults from './components/SearchJourneyResults.js';
import Main from './components/Main';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path='/restriction-codes/results' component={RestrictionCodeResults}/>
          <Route path='/restriction-codes' component={RestrictionCodeForm}/>
          <Route path='/search-journey/results' component={SearchJourneyResults}/>
          <Route path='/search-journey' component={SearchJourneyForm}/>
          <Route path='/' component={Main}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
