import React from 'react';
import DetectMyLocation from './../DetectMyLocation/DetectMyLocation';
import SearchBar from './../SearchBar/SearchBar';
import FadeIn from './../FadeIn/FadeIn';
import './Header.css';

const Header = (props) => {
  return (
    <FadeIn timeout={400}>
      <div className="header">
        <DetectMyLocation
          isLandingPage={false}
          setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)}
        />
        <div className="or">Or</div>
        <SearchBar
          isLandingPage={false}
          setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)}
          setWeatherDataFromPlaceName={(place) => props.setWeatherDataFromPlaceName(place)}
        />
      </div>
    </FadeIn>
  );
};

export default Header;
