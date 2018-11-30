import React, { Component } from 'react';
import { Map, InfoWindow,  GoogleApiWrapper } from 'google-maps-react';
import NoMapDisplay from './NoMapDisplay';

const MAP_KEY = "AIzaSyCzZvujlnTYKZGkoiQTbFV1Ghr7yM14IEA";
const FS_VERSION = "20181128";
const FS_CLIENT_ID = "VKIWAKGQ2NHXSEZBFKIK5E0VNZTRJKGW14MD21SNE2BZFYGH";
const FS_SECRET = "HZCUYWHRO1GYI3X1SQ5OAD2YYBM1FUKTZU1RUX4JPENRDPEB";

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

  componentWillReceiveProps = (props) => {
    this.setState({ firstDrop: false });

    // update markers according to search filtered result
    if (this.state.markers.length !== props.locations.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.locations);
      this.setState({ activeMarker: null });
      return;
    }
    // if the selected item is not the same as the active marker, close the info window
    if (!props.selectedIndex || (this.state.activeMarker &&
      (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
      this.closeInfoWindow();
    }
    // if nothing is selected, don't do anything
    if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
      return;
    };

    this.onMarkerClicked(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
  }

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
        animation: this.state.firstDrop ? this.props.google.maps.Animation.DROP : null
      });
      marker.addListener('click', () => {
        this.onMarkerClicked(mProps, marker, null);
      });
      return marker;
    });

    this.setState({ markers, markerProps });
  }

  getBusinessInfo = (props, data) => {
    // filter the data result from foursquare fetch fn to make sure it matches our location's data
    return data.response.venues.filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

  onMarkerClicked = (props, marker, e) => {
    this.closeInfoWindow();

    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT_ID}
      &client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},
      ${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(url, { method: 'GET', headers });

    let activeMarkerProps;
    fetch(request)
      .then(response => response.json())
      .then(result => {
        let attractionLoc = this.getBusinessInfo(props, result);
        activeMarkerProps = {
          ...props,
          foursquare: attractionLoc[0]
        };

        // get image of location from the initial foursquare fetch request above
        if (activeMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${attractionLoc[0].id}/photos?client_id=
            ${FS_CLIENT_ID}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
          fetch(url)
            .then(response => response.json())
            .then(result => {
              activeMarkerProps = {
                ...activeMarkerProps,
                images: result.response.photos
              }

              if (this.state.activeMarker) this.state.activeMarker.setAnimation(null);
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              // const img = "https://3.bp.blogspot.com/-S9XfyKnuKms/WNnrWwV-YZI/AAAAAAAADUs/L3m49TTbPYElBrBSbj4wXxv0sSazxtbggCLcB/s1600/sticker1.png";
              // activeMarkerProps.icon = img;
              this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps });
            })
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps });
        }
      })
  }

  closeInfoWindow = () => {
    // disable any active marker animation
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null });
  }

  render() {
    const style = {
      width: '100%',
      height: '80%'
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
            {amProps && amProps.url
                ? (
                  <div>
                    <a href={amProps.url}><h3>{amProps.name}</h3></a>
                  </div>
                )
                : <h3>{amProps && amProps.name}</h3> }
                {amProps && amProps.images
                    ? (
                      <div>
                        <img
                          alt={amProps.name + " picture"}
                          src={amProps.images.items[0].prefix + "80x80" + amProps.images.items[0].suffix}/>
                        <p>Image from Foursquare</p>
                      </div>
                    )
                    : "" }
                  </div>
                </InfoWindow>
              </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: MAP_KEY, LoadingContainer: NoMapDisplay })(MapDisplay)

// credit: https://github.com/fullstackreact/google-maps-react
