import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import RestrictionCodeForm from './RestrictionCodeForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RestrictionCodeForm />
        <Footer />
      </div>
    );
  }
}

export default App;
