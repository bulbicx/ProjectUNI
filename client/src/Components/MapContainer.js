import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
 
class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  } 

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const coords = { lat: this.props.lat, lng: this.props.lng }

      return (
        <div style={{height: '700px', width: '1200px'}}>  
            <Map
              style={{ height: '700px', width: '1200px' }}
              google={this.props.google}
              initialCenter={coords}
              onClick={this.onMapClicked}
              zoom={14}
            >
            {/* if position is not given than initial center is given as default */} 
            <Marker
              title={'Click the marker to view information'}
              onClick={this.onMarkerClick}
              name={this.props.name}
            />
        
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
              <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
            </Map>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(MapContainer)