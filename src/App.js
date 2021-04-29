import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';
import LandingPage from './LandingPage/LandingPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './App.css';

export default function App() {
  const [weatherData, setWeatherData] = useState({
    coordinates: null,
    placeName: null,
    currentWeather: null,
    forecast: null,
    units: null,
  });

  useEffect(() => {
    const storedPlaceName = localStorage.getItem('placeName');
    if (storedPlaceName) {
      setWeatherDataFromPlaceName(storedPlaceName);
    }
    // this should only run once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setWeatherDataFromPlaceName(placeName) {
    if (placeName !== weatherData.placeName) {
      try {
        const res = await axios.get(`https://api.howsthesky.com/search?placename=${placeName}`);
        localStorage.setItem('placeName', placeName);
        setWeatherData({
          coordinates: null,
          placeName,
          currentWeather: res.data.currentWeather,
          forecast: res.data.forecast,
          units: res.data.units,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  function areCoordinatesNew(coords) {
    return (
      !weatherData.coordinates ||
      coords.lat !== weatherData.coordinates.lat ||
      coords.long !== weatherData.coordinates.long
    );
  }

  async function setWeatherDataFromPosition(coords) {
    if (areCoordinatesNew(coords)) {
      try {
        const res = await axios.get(`https://api.howsthesky.com/weather?lat=${coords.lat}&long=${coords.long}`);
        localStorage.setItem('placeName', res.data.placeName);
        setWeatherData({
          coordinates: coords,
          placeName: res.data.placeName,
          currentWeather: res.data.currentWeather,
          forecast: res.data.forecast,
          units: res.data.units,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  if (weatherData.currentWeather && weatherData.forecast) {
    const forecastDays = weatherData.forecast.map((day, i) => (
      <ForecastDay key={'forecast-day-' + i} data={day} index={i} units={weatherData.units} />
    ));
    return (
      <div className="app">
        <Header
          setWeatherDataFromPosition={setWeatherDataFromPosition}
          setWeatherDataFromPlaceName={setWeatherDataFromPlaceName}
        />
        <CurrentWeather data={weatherData.currentWeather} placeName={weatherData.placeName} units={weatherData.units} />
        <div className="forecast">{forecastDays}</div>
        <Footer isMainPage={true} />
      </div>
    );
  }

  if (!weatherData.placeName)
    <LandingPage
      setWeatherDataFromPosition={setWeatherDataFromPosition}
      setWeatherDataFromPlaceName={setWeatherDataFromPlaceName}
    />;

  // TODO: return spinner instead of null
  return null;
}
