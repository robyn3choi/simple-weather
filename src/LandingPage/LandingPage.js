import React from 'react';
import DetectMyLocation from './../DetectMyLocation/DetectMyLocation';
import SearchBar from './../SearchBar/SearchBar';
import './LandingPage.css';
import FadeIn from './../FadeIn/FadeIn';
import Footer from './../Footer/Footer';

const LandingPage = (props) => {
  return (
    <div className="landing-page">
      <FadeIn timeout={50}>
        <DetectMyLocation setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)} />
      </FadeIn>
      <FadeIn timeout={50}>
        <div className="or">Or</div>
      </FadeIn>
      <FadeIn timeout={50}>
        <SearchBar
          setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)}
          setWeatherDataFromPlaceName={(place) => props.setWeatherDataFromPlaceName(place)}
        />
      </FadeIn>
      <Footer isMainPage={false} />
    </div>
  );
};

export default LandingPage;
