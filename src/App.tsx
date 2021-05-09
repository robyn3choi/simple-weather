import Splash from './Splash/Splash';
import WeatherReport from './WeatherReport/WeatherReport';
import { useWeatherData } from './WeatherProvider';

export default function App() {
  const { weatherData, isLoading } = useWeatherData();

  if (isLoading) {
    return null;
  }

  if (weatherData && weatherData.currentWeather && weatherData.forecast) {
    return <WeatherReport />;
  }

  if (!weatherData || !weatherData.placeName) {
    return <Splash />;
  }

  return null;
}
