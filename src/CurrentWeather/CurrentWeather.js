import React from 'react';
import FadeIn from './../FadeIn/FadeIn';
import './CurrentWeather.css';

const CurrentWeather = (props) => {
  return (
    <div className='current-weather'>
      <FadeIn counter={props.entries} timeout={0}>
        <div>
          <div className='place-name'>{`In ${props.placeName}, it's:`}</div>
          <div className='current-weather__icon-temp-container'>
            <div className='current-weather__temp'>{props.data.temperature}&deg;</div>
            <img className='current-weather__icon' alt='weather-icon' src={'/icons/' + props.data.icon + '.svg'} />
          </div>
        </div>
      </FadeIn>
      <FadeIn counter={props.entries} timeout={80}>
        <div className='current-weather__description'>{props.data.description}</div>
      </FadeIn>
    </div>
  );
}

export default CurrentWeather;