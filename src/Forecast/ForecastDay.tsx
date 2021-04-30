import { useState, useRef, useEffect } from 'react';
import { WEEKDAY_NAMES, WINDSPEED_UNITS } from '../constants';
import FadeIn from '../FadeIn/FadeIn';
import ForecastDetail from './ForecastDetail';
import ForecastDayType from '../types/ForecastDay';
import './Forecast.css';

type Props = {
  index: number;
  data: ForecastDayType;
  units: string;
};

export default function ForecastDay({ index, data, units }: Props) {
  const [isDescriptionFontSmall, setIsDescriptionFontSmall] = useState(false);
  const descriptionHeight = useRef<number | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    function resizeDescriptionIfNeeded() {
      const handleResize = () => {
        setIsDescriptionFontSmall(descriptionHeight.current! > descriptionRef.current!.clientHeight);
      };

      descriptionHeight.current = descriptionRef.current!.scrollHeight;
      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    },
    [data.description]
  );

  return (
    <FadeIn timeout={160 + 80 * index}>
      <div className={`forecast-day ${index % 2 === 0 ? 'forecast-day--light' : ''}`}>
        <div className="forecast-day__weekday-date">
          <div className="forecast-day__weekday">{index === 0 ? 'Today' : WEEKDAY_NAMES[data.weekday]}</div>
          <div className="forecast-day__date">
            {data.month + 1}/{data.date}
          </div>
        </div>
        <img className="forecast-day__main-icon" alt="weather-icon" src={'/icons/' + data.icon + '.svg'} />
        <div
          className={`forecast-day__description ${isDescriptionFontSmall ? 'forecast-day__description_small' : ''}`}
          ref={descriptionRef}
        >
          {data.description}
        </div>
        <div className="forecast-day__details">
          <ForecastDetail
            iconAlt="temperature"
            iconSrc="/icons/temperature.svg"
            text={`${data.tempHigh}\u00b0/${data.tempLow}\u00b0`}
          />
          <ForecastDetail
            iconAlt="wind speed"
            iconSrc="/icons/wind.svg"
            text={
              <>
                {data.wind}
                <span className="forecast-day__wind-speed-units">{` ${WINDSPEED_UNITS[units]}`}</span>
              </>
            }
          />
          <ForecastDetail
            iconAlt="probability-of-precipitation"
            iconSrc="/icons/umbrella.svg"
            text={`${data.precipChance}%`}
          />
        </div>
      </div>
    </FadeIn>
  );
}
