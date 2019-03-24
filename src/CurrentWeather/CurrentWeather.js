import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = (props) => {
  return (
    <div className='current-weather'>
      <div className='current-weather__icon-temp-container'>
      <div className='current-weather__temp'>{props.data.temperature}&deg;</div>
        <img className='current-weather__icon' alt='weather-icon' src={'/icons/' + props.data.icon + '.svg'} />
      </div>
      <div className='current-weather__description'>{props.data.description}</div>
    </div>
  )
}

export default CurrentWeather;