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

  getBusinessInfo = (props, data) => {
    // filter the data result from flickr to make sure it matches our location's name
    return data.photos.photo.filter(img => img.title.includes(props.name) || props.name.includes(img.title));
  }

  onMarkerClicked = (props, marker, e) => {
    this.closeInfoWindow();

    let url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=12efbb7f2a30953c5dbc9503f9efd556&tags=&text=the+space+needle&sort=interestingness-desc&safe_search=1&content_type=1&per_page=20&page=1&format=json&nojsoncallback=1&auth_token=72157674008717587-f0a5a7f8fcb4b480&api_sig=d4ff9378f5cbdd99d1a18e1860af10c9";
    /* developer note:
     * I really tried to use flickr API instead of the usual foursquare in tutorial
     * but I can't get the authorization to work
     * The above link is generated with flickr's developer interactive app,
     * which change signature everytime a new query/get request is made to their server
     * This needs more time to investigate, but i'm in a time crunch to submit my project
     * Hence, will update flickr branch when I have a chance
     */

    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result);

        let attractionLoc = this.getBusinessInfo(props, result);
        console.log('attractions: ', attractionLoc);
      })

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
