import React, { Component } from 'react';
import { Map, InfoWindow,  GoogleApiWrapper } from 'google-maps-react';

const MAP_KEY = "AIzaSyCzZvujlnTYKZGkoiQTbFV1Ghr7yM14IEA";

export class MapDisplay extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  }

  componentDidMount = () => {}

  onMapReady = (props, map) => {
    this.setState({ map });
    this.updateMarkers(this.props.locations);
  }

  updateMarkers = (locations) => {
    if (!locations) return;
    // remove any existing markers
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = locations.map((eachLocation, index) => {
      let mProps = {
        key: index,
        index,
        name: eachLocation.name,
        position: eachLocation.pos,
        url: eachLocation.url
      }
      markerProps.push(mProps);

      let marker = new this.props.google.maps.Marker({
        position: eachLocation.pos,
        map: this.state.map,
        animation: this.props.google.maps.Animation.DROP
      });
      const toggleBounce = () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
        }
      }
      marker.addListener('click', () => {
        toggleBounce();
        this.onMarkerClicked(mProps, marker, null);
      });
      return marker;
    });

    this.setState({ markers, markerProps });
  }

  onMarkerClicked = (props, marker, e) => {
    this.closeInfoWindow();
    this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props });
  }

  closeInfoWindow = () => {
    // disable any active marker animation
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null });
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
    let amProps = this.state.activeMarkerProps; // active marker props

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
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}
        >
          <div>
            <h3>{amProps && amProps.name}</h3>
            {amProps && amProps.url
                ? ( <a href={amProps.url}>See Website</a> )
                : ""}
              </div>
            </InfoWindow>
          </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: MAP_KEY })(MapDisplay)

// credit: https://github.com/fullstackreact/google-maps-react
