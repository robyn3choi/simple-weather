import { useState } from 'react';
import { useWeatherData } from '../WeatherProvider';
import './DetectMyLocation.css';

export default function DetectMyLocation() {
  const { setWeatherDataFromPosition } = useWeatherData();
  const [isErrorMsgDisplayed, setIsErrorMsgDisplayed] = useState(false);

  function detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setWeatherDataFromPosition({ latitude, longitude });
        },
        (err) => {
          console.log(err);
          setIsErrorMsgDisplayed(true);
        },
        { timeout: 4000 }
      );
    }
  }

  return (
    <div>
      <div className="location-button-container">
        <button className={`location-button`} onClick={detectLocation}>
          Detect my location
        </button>
      </div>
      <div className={`location-error ${isErrorMsgDisplayed ? 'location-error_displayed' : ''}`}>
        <div className="location-error__text">
          There was a problem detecting your location. If you are on mobile, make sure any screen overlays are turned
          off.
        </div>
        <button className="location-error__exit-btn" onClick={() => setIsErrorMsgDisplayed(false)}>
          x
        </button>
      </div>
    </div>
  );
}
