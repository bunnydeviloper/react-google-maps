import React, { Component } from 'react';
import { Map, InfoWindow,  GoogleApiWrapper } from 'google-maps-react';

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
              console.log(activeMarkerProps);

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
