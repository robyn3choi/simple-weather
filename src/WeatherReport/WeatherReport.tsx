import CurrentWeather from '../CurrentWeather/CurrentWeather';
import Forecast from '../Forecast/Forecast';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './WeatherReport.css';

export default function WeatherReport() {
  return (
    <div className="weather-report">
      <Header />
      <CurrentWeather />
      <Forecast />
      <Footer isMainPage={true} />
    </div>
  );
}
