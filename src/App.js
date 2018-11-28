import React, { Component } from 'react';
import './App.css';

import { MapWithAMarker } from './components/GoogleMaps';

class App extends Component {
  render() {
    const API = 'AIzaSyCzZvujlnTYKZGkoiQTbFV1Ghr7yM14IEA';
    return (
      <div className="App">
        <div>
          TODO: create NavBar component here
        </div>
        <MapWithAMarker
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <div>
          TODO: create SidePanel component here
        </div>
      </div>
    );
  }
}

export default App;
