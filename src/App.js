import React, { Component } from 'react';
import './App.css';
import locations from './data/locations';

import GoogleMaps from './components/GoogleMaps';
import SidePanel from './components/SidePanel';

class App extends Component {
  state = {
    lat: 47.6205063,
    lng: -122.3514661,
    zoom: 13,
    allLocations: locations,
    open: false,
    filtered: null
  }

  styles = {
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

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.allLocations, "")
    });
  }

  toggleSidePanel = () => {
    this.setState({ open: !this.state.open });
  }

  filterLocations = (locations, query) => {
    return locations.filter(eachLoc => eachLoc.name.toLowerCase().includes(query.toLowerCase()));
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.allLocations, query)
    });
  }

  clickListItem = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open })
  }

  render() {
    return (
      <div className="App">
        <header>
          <button onClick={this.toggleSidePanel} style={this.styles.menuButton} aria-label="toggle side panel">
            <i className="fa fa-bars"></i>
          </button>
          <h1>React Neighborhood Map Project</h1>
        </header>
        <GoogleMaps
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}
        />

        <SidePanel
          locations={this.state.filtered}
          open={this.state.open}
          toggleSidePanel={this.toggleSidePanel}
          onChangeNewQuery={this.updateQuery}
          clickListItem={this.clickListItem}
        />
      </div>
    );
  }
}

export default App;
