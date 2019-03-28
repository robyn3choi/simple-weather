import React from 'react';
import './DetectMyLocation.css';

const detectLocation = (props) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = { lat: pos.coords.latitude, long: pos.coords.longitude };
      props.setWeatherDataFromPosition(coords)
    }, err => console.log(err));
  }
}

const DetectMyLocation = (props) => {
  return (
    <div className='location-button-container'>
      <button className={`location-button`}
        onClick={() => detectLocation(props)}>
        Detect my location
          </button>
    </div>
  );
}

export default DetectMyLocation;