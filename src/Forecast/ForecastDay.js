import React from 'react';
import FadeIn from './../FadeIn/FadeIn';
import * as Constants from './../Constants';
import './ForecastDay.css';

const ForecastDay = (props) => {
  return (
    <FadeIn counter={props.entries} timeout={160 + 80 * props.index}>
      <div className={`forecast-day ${props.index % 2 === 0 ? 'forecast-day_light' : ''}`}>
        <div className='forecast-day__weekday-date'>
          <div className='forecast-day__weekday'>{props.index === 0 ? 'Today' : Constants.WEEKDAY_NAMES[props.data.weekday]}</div>
          <div className='forecast-day__date'>{props.data.month + 1}/{props.data.date}</div>
        </div>
        <img className='forecast-day__main-icon' alt='weather-icon' src={'/icons/' + props.data.icon + '.svg'} />
        <div className='forecast-day__description'>{props.data.description}</div>
        <div className='forecast-day__icons-with-text'>
          <div className='forecast-day__icon-with-text'>
            <img className='forecast-day__icon' alt='temperature' src={'/icons/temperature.svg'} />
            <div className='forecast-day__icon-text'>{props.data.tempHigh}&deg;/{props.data.tempLow}&deg;</div>
          </div>
          <div className='forecast-day__icon-with-text'>
            <img className='forecast-day__icon' alt='wind-speed' src={'/icons/wind.svg'} />
            <div className='forecast-day__text'>{props.data.wind}
              <span className='forecast-day__wind-speed-units'>{` ${Constants.WINDSPEED_UNITS[props.units]}`}</span>
            </div>
          </div>
          <div className='forecast-day__icon-with-text'>
            <img className='forecast-day__icon' alt='probability-of-precipitation' src={'/icons/umbrella.svg'} />
            <div className='forecast-day__text'>{props.data.precipChance}%</div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default ForecastDay;