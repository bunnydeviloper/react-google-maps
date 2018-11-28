import React, { Component } from 'react';
import './App.css';

import GoogleApiWrapper from './components/GoogleMaps';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          TODO: create NavBar component here
        </div>
        <GoogleApiWrapper />
        <div>
          TODO: create SidePanel component here
        </div>
      </div>
    );
  }
}

export default App;
