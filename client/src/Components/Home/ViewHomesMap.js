import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { baseUrl } from '../../shared/baseUrl'
import no_photo from '../../assets/images/no_image_available.jpeg'
import pin from '../../assets/images/pin.png'
import pinbuy from '../../assets/images/pinbuy.png'

class ViewHomesMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      id: '',
      cate: '',
      imgPath: '',
      coords: [],
      rentCoords: [],
      buyCoords: []
    }
  }

  addPlace = () => {
    const aSt = 'public'

    this.props.properties.map(p => this.setState(prevState =>
      ({
        coords: [
          ...prevState.coords,
          { 
            _id: p._id, 
            lat: p.lat, 
            lng: p.lng, 
            name: p.propertyName, 
            cat: p.category, 
            path: p.pictures.length && p.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
          }
        ]
      })
    ))
  }

  addPlaceForRent = () => {
    const aSt = 'public'
    this.props.propertiesToRent.map(p => this.setState(prevState =>
      ({
        rentCoords: [
          ...prevState.rentCoords,
          { 
            _id: p._id, 
            lat: p.lat, 
            lng: p.lng, 
            name: p.propertyName, 
            cat: p.category, 
            path: p.pictures.length && p.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
          }
        ]
      })
    ))
    // for (let i = 0; i < this.props.properties.length; i++) {
    //   const { properties } = this.props
    //   this.setState(prevState => ({
    //     coords: [...prevState.coords, { _id: properties[i]._id, lat: properties[i].lat, lng: properties[i].lng, name: properties[i].propertyName }]
    //   }))
    // }
  }

  addPlaceForBuy = () => {
    const aSt = 'public'
    this.props.propertiesToBuy.map(p => this.setState(prevState =>
      ({
        buyCoords: [
          ...prevState.buyCoords,
          { 
            _id: p._id, 
            lat: p.lat, 
            lng: p.lng, 
            name: p.propertyName, 
            cat: p.category, 
            path: p.pictures.length && p.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
          }
        ]
      })
    ))
  }

  componentDidMount() {
    this.addPlace()
    this.addPlaceForRent()
    this.addPlaceForBuy()
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      id: '',
      cate: '',
    });
    let t = this.state.coords.filter(el => el.name === this.state.activeMarker.name)[0]
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      id: t._id,
      cate: t.cat,
      imgPath: t.path
    });
    // history.push(`/properties-to-${t.cat}/${t._id}`)
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
    const initialCoords = { lat: 51.4178, lng: -0.0848 }

      return (
        <div style={{ height: '620px', width: '1130px'}}>  
            <Map
              style={{ height: '620px', width: '1130px' }}
              google={this.props.google}
              initialCenter={initialCoords}
              onClick={this.onMapClicked}
              zoom={14}
            >
            {/* if position is not given than initial center is given as default */}
            {this.state.rentCoords.map(item => (
              <Marker
                key={item._id}
                title={'Click the marker to view information'}
                onClick={this.onMarkerClick}
                name={item.name}
                position={{ lat: item.lat, lng: item.lng }}
                icon={{
                  url: pin
                }} 
              />
            ))}
            {this.state.buyCoords.map(item => (
              <Marker
                key={item._id}
                title={'Click the marker to view information'}
                onClick={this.onMarkerClick}
                name={item.name}
                position={{ lat: item.lat, lng: item.lng }}
                icon={{
                  url: pinbuy
                }} 
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <a
                  style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold' }}
                  href={`http://localhost:3006/properties-to-${ this.state.cate }/${ this.state.id }`}
                >
                  {this.state.selectedPlace.name}
                </a>
                {
                  this.state.cate === 'rent' ?
                    <span className="ml-1 mt-1 badge badge-warning" style={{ fontSize: '0.8rem' }}>rent</span>
                    :
                    <span className="ml-1 mt-1 badge badge-danger" style={{fontSize: '0.8rem'}}>buy</span>
                }
                
                <br />
                <img src={this.state.imgPath.length ? baseUrl + this.state.imgPath : no_photo} alt={this.state.id} width="135" style={{ marginTop: '0.3em' }} />
                <br />
                <a
                  style={{ marginTop: '0.3em' }}
                  href={`http://localhost:3006/properties-to-${ this.state.cate }/${ this.state.id }`}
                  className="btn btn-dark"
                >
                  GO
                </a>
              </div>
            </InfoWindow>
            </Map>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
})(ViewHomesMap)