import { useWeatherData } from '../WeatherProvider';
import ForecastDay from './ForecastDay';

export default function Forecast() {
  const { weatherData } = useWeatherData();

  return (
    <div className="forecast">
      {weatherData!.forecast.map((day, i) => (
        <ForecastDay key={day.date} index={i} data={day} units={weatherData!.units} />
      ))}
    </div>
  );
}
