import React, { Component } from 'react';
import './App.css';
import { getCurrentWeatherFromPos, getForecastFromPos } from './DarkSkyApiCalls';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';

class App extends Component {
  state = {
    location: null,
    currentWeatherData: null,
    forecastData: null
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => this.setLocation(pos), err => console.log(err));
    }
  }

  setLocation(pos) {
    this.setState({ location: pos });
    getCurrentWeatherFromPos(pos).then(data => this.setState({ currentWeatherData: data }));
    getForecastFromPos(pos).then(data => this.setState({ forecastData: data }));
  }

  render() {
    if (this.state.currentWeatherData && this.state.forecastData) {
      const forecastDays = this.state.forecastData.map((day, i) =>
        <ForecastDay key={'forecast-day-' + i} data={day} index={i} />
      );
      return (
        <div className='app'>
          <CurrentWeather data={this.state.currentWeatherData} />
          <div className='forecast'>{forecastDays}</div>
          <div className='dark-sky-attribution'>
            Powered by <a href='https://darksky.net/poweredby/'>Dark Sky</a>
          </div>
          <div className='icons-attribution'>
            Icons by <a href='https://github.com/zagortenay333/Tempestacons'>Tempestacons</a> and formatted by <a href='https://github.com/rickellis/SVG-Weather-Icons'>rickellis</a>
          </div>
        </div>
      )
    }
    else {
      return null;
    }


  }
}

export default App;
