import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MAP_KEY = "AIzaSyCzZvujlnTYKZGkoiQTbFV1Ghr7yM14IEA";

export class MapDisplay extends Component {
  state = {
    map: null
  }

  componentDidMount = () => {}

  onMapReady = (props, map) => {
    this.setState({ map });
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    console.log('map was clicked');
  }

  render() {
    const style = {
      width: '100%',
      height: '50%'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.onMapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.closeInfoWindow}
      >
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: MAP_KEY })(MapDisplay)

// credit: https://github.com/fullstackreact/google-maps-react
