import { useState, useRef, useEffect } from 'react';
import FadeIn from './../FadeIn/FadeIn';
import { WEEKDAY_NAMES, WINDSPEED_UNITS } from '../constants';
import './ForecastDay.css';

export default function ForecastDay(props) {
  const [isDescriptionFontSmall, setIsDescriptionFontSmall] = useState(false);
  const descriptionHeight = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsDescriptionFontSmall(descriptionHeight.current > descriptionRef.current.clientHeight);
    }
    descriptionHeight.current = descriptionRef.current.scrollHeight;
    window.addEventListener('resize', handleResize);
    handleResize();
  }, [props.data.description]);

  return (
    <FadeIn timeout={160 + 80 * props.index}>
      <div className={`forecast-day ${props.index % 2 === 0 ? 'forecast-day_light' : ''}`}>
        <div className="forecast-day__weekday-date">
          <div className="forecast-day__weekday">{props.index === 0 ? 'Today' : WEEKDAY_NAMES[props.data.weekday]}</div>
          <div className="forecast-day__date">
            {props.data.month + 1}/{props.data.date}
          </div>
        </div>
        <img className="forecast-day__main-icon" alt="weather-icon" src={'/icons/' + props.data.icon + '.svg'} />
        <div
          className={`forecast-day__description ${isDescriptionFontSmall ? 'forecast-day__description_small' : ''}`}
          ref={descriptionRef}
        >
          {props.data.description}
        </div>
        <div className="forecast-day__icons-with-text">
          {/* temperature */}
          <div className="forecast-day__icon-with-text">
            <img className="forecast-day__icon" alt="temperature" src={'/icons/temperature.svg'} />
            <div className="forecast-day__icon-text">
              {props.data.tempHigh}&deg;/{props.data.tempLow}&deg;
            </div>
          </div>
          {/* wind */}
          <div className="forecast-day__icon-with-text">
            <img className="forecast-day__icon" alt="wind-speed" src={'/icons/wind.svg'} />
            <div className="forecast-day__text">
              {props.data.wind}
              <span className="forecast-day__wind-speed-units">{` ${WINDSPEED_UNITS[props.units]}`}</span>
            </div>
          </div>
          {/* precipitation */}
          <div className="forecast-day__icon-with-text">
            <img className="forecast-day__icon" alt="probability-of-precipitation" src={'/icons/umbrella.svg'} />
            <div className="forecast-day__text">{props.data.precipChance}%</div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
