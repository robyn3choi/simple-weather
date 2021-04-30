import Coordinates from './Coordinates';
import CurrentWeather from './CurrentWeather';
import ForecastDay from './ForecastDay';

type WeatherData = {
  coordinates?: Coordinates;
  placeName: string;
  currentWeather: CurrentWeather;
  forecast: ForecastDay[];
  units: string;
};

export default WeatherData;
