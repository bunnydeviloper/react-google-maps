import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  onMapClicked = (mapProps, map, clickEvent) => {
    console.log('map was clicked');
  }

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesServive(map);
    // fetch info from third party API here
    console.log(service);
  }
  centerMoved(mapProps, map) {
    // ...
  }


  render() {
    const style = {
      width: '100%',
      height: '50%'
    };
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 47.620569,
          lng: -122.349420
        }}
        zoom={10}
        onClick={this.onMapClicked}
        onReady={this.fetchPlaces}
        onDragend={this.centerMoved}
        visible={false}
      >
        {/* <Listing places={this.state.places} /> */}
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

        {/*
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
        */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCzZvujlnTYKZGkoiQTbFV1Ghr7yM14IEA')
})(MapContainer)

// credit: https://github.com/fullstackreact/google-maps-react
