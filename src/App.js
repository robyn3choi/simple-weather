import React, { Component } from 'react';
import './App.css';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';
import SearchBar from './SearchBar/SearchBar';

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

    fetch(`http://localhost:8081/currentweather?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
      .then(response => response.json())
      .then(data => this.setState({ currentWeatherData: data }))
      .catch(err => console.log(err));

    fetch(`http://localhost:8081/forecast?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
      .then(response => response.json())
      .then(data => this.setState({ forecastData: data }))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.currentWeatherData && this.state.forecastData) {
      const forecastDays = this.state.forecastData.map((day, i) =>
        <ForecastDay key={'forecast-day-' + i} data={day} index={i} />
      );
      return (
        <div className='app'>
          <SearchBar />
          <CurrentWeather data={this.state.currentWeatherData} />
          <div className='forecast'>{forecastDays}</div>
          <div className='dark-sky-attribution'>
            Powered by <a href='https://darksky.net/poweredby/'>Dark Sky</a>
          </div>
          <div className='icons-attribution'>
            Icons from <a href='https://github.com/zagortenay333/Tempestacons'>Tempestacons</a> and formatted by <a href='https://github.com/rickellis/SVG-Weather-Icons'>rickellis</a>
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
