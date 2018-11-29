import React, { Component } from 'react';
import './App.css';
import locations from './data/locations';

import GoogleMaps from './components/GoogleMaps';
// import SidePanel from './components/SidePanel';

class App extends Component {
  state = {
    lat: 47.6205063,
    lng: -122.3514661,
    zoom: 13,
    allLocations: locations,
    open: false
  }

  style = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 10,
      background: "white",
      padding: 10,
    },
    hide: {
      display: "none"
    },
    header: {
      marginTop: "0px"
    }
  }

  toggleSidePanel = () => {
  }

  render() {
    return (
      <div className="App">
        <h1>
          React Neighborhood Map Project
        </h1>
        <div> TODO: create SidePanel component here </div>
        <div>
          <GoogleMaps
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            locations={this.state.allLocations}
          />
        </div>
      </div>
    );
  }
}

export default App;
