import FadeIn from '../FadeIn/FadeIn';
import { useWeatherData } from '../WeatherProvider';
import './CurrentWeather.css';

export default function CurrentWeather() {
  const { weatherData } = useWeatherData();
  const { placeName } = weatherData!;
  const { temperature, icon, description } = weatherData!.currentWeather;
  console.log('currweather');
  return (
    <div className="current-weather">
      <FadeIn timeout={0}>
        <div>
          <div className="place-name">{`In ${placeName}, it's:`}</div>
          <div className="current-weather__icon-temp-container">
            <div className="current-weather__temp">{temperature}&deg;</div>
            <img className="current-weather__icon" alt="weather-icon" src={'/icons/' + icon + '.svg'} />
          </div>
        </div>
      </FadeIn>
      <FadeIn timeout={80}>
        <div className="current-weather__description">{description}</div>
      </FadeIn>
    </div>
  );
}
