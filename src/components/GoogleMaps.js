import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 47.6205063, lng: -122.3514661 }}
  >
    <Marker
      position={{ lat: 47.6205063, lng: -122.3514661 }}
    />
  </GoogleMap>
));

