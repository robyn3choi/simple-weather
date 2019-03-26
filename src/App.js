import React, { Component } from 'react';
import './App.css';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';
import LandingPage from './LandingPage/LandingPage';
import SearchBar from './SearchBar/SearchBar';
import Header from './Header/Header';

class App extends Component {
  state = {
    location: null,
    currentWeather: null,
    forecast: null
  }

  setLocation(pos) {
    this.setState({ location: pos });

    // fetch(`http://localhost:8081/currentweather?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
    //   .then(response => response.json())
    //   .then(data => this.setState({ currentWeather: data }))
    //   .catch(err => console.log(err));

    // fetch(`http://localhost:8081/forecast?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
    //   .then(response => response.json())
    //   .then(data => this.setState({ forecast: data }))
    //   .catch(err => console.log(err));

    fetch(`http://localhost:8081/weather?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
      .then(response => response.json())
      .then(data => this.setState({ currentWeather: data.currentWeather, forecast: data.forecast }))
      .catch(err => console.log(err));

  }

  setWeatherData(currentWeather, forecast) {
    console.log(currentWeather)
    this.setState({ currentWeather: currentWeather, forecast: forecast });
  }

  render() {
    if (this.state.currentWeather && this.state.forecast) {
      const forecastDays = this.state.forecast.map((day, i) =>
        <ForecastDay key={'forecast-day-' + i} data={day} index={i} />
      );
      return (
        <div className='app'>
          <Header
            setLocation={(pos) => this.setLocation(pos)}
            setWeatherData={(curr, fore) => this.setWeatherData(curr, fore)} />
          <CurrentWeather data={this.state.currentWeather} />
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
      return (
        <LandingPage
          setLocation={(pos) => this.setLocation(pos)}
          setWeatherData={(curr, fore) => this.setWeatherData(curr, fore)} />
      )
    }


  }
}

export default App;
