import { createContext, ReactNode, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import WeatherData from './types/WeatherData';
import Coordinates from './types/Coordinates';

type ContextValue = {
  weatherData: WeatherData | null;
  setWeatherDataFromPlaceName: (placeName: string) => void;
  setWeatherDataFromPosition: (coords: Coordinates) => void;
};

const WeatherDataContext = createContext<ContextValue | undefined>(undefined);

export function WeatherDataProvider({ children }: { children: ReactNode }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const storedPlaceName = localStorage.getItem('placeName');
    if (storedPlaceName) {
      setWeatherDataFromPlaceName(storedPlaceName);
    }
    // this should only run once on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setWeatherDataFromPlaceName(placeName: string) {
    if (!weatherData || placeName !== weatherData.placeName) {
      try {
        const res = await axios.get(`https://api.howsthesky.com/search?placename=${placeName}`);
        localStorage.setItem('placeName', placeName);
        setWeatherData({
          placeName,
          currentWeather: { ...res.data.currentWeather },
          forecast: res.data.forecast,
          units: res.data.units,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function setWeatherDataFromPosition(coords: Coordinates) {
    if (areCoordinatesNew(coords)) {
      try {
        const res = await axios.get(
          `https://api.howsthesky.com/weather?lat=${coords.latitude}&long=${coords.longitude}`
        );
        localStorage.setItem('placeName', res.data.placeName);
        setWeatherData({
          coordinates: coords,
          placeName: res.data.placeName,
          currentWeather: { ...res.data.currentWeather },
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
      !weatherData ||
      !weatherData.coordinates ||
      coords.latitude !== weatherData.coordinates.latitude ||
      coords.longitude !== weatherData.coordinates.longitude
    );
  }

  return (
    <WeatherDataContext.Provider value={{ weatherData, setWeatherDataFromPlaceName, setWeatherDataFromPosition }}>
      {children}
    </WeatherDataContext.Provider>
  );
}

export function useWeatherData() {
  const context = useContext(WeatherDataContext);
  if (context === undefined) {
    throw new Error('useWeatherData must be used within a WeatherDataProvider');
  }
  return context;
}
