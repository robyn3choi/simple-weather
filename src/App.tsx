import Splash from './Splash/Splash';
import WeatherReport from './WeatherReport/WeatherReport';
import { useWeatherData } from './WeatherProvider';

export default function App() {
  const { weatherData } = useWeatherData();

  if (weatherData && weatherData.currentWeather && weatherData.forecast) {
    return <WeatherReport />;
  }

  if (weatherData && !weatherData.placeName) {
    return <Splash />;
  }

  // TODO: return spinner instead of null
  return null;
}
