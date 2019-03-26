import React, { Component } from 'react';
import './DetectMyLocation.css';

class DetectMyLocation extends Component {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => this.props.setLocation(pos), err => console.log(err));
    }
  }

  render() {
    return (
        <div className='location-button-container'>
          <button className={`location-button`}
            onClick={() => this.detectLocation()}>
            Detect my location
          </button>
        </div>
    );
  }
}

export default DetectMyLocation;