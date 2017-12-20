import React from "react";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWaxlS3Hg-U3SLUNPq6MjB2EKQp4eusps",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%`, width: `50%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 38.9217805, lng: -77.0332667 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 38.9217805, lng: -77.0332667 }} />}
  </GoogleMap>
)

export default MyMapComponent;
