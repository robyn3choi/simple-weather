import React, { Component } from 'react';
import './App.css';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';
import LandingPage from './LandingPage/LandingPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class App extends Component {
  state = {
    coordinates: null,
    placeName: '',
    currentWeather: null,
    forecast: null
  }

  setLocation(pos) {
    this.setState({ coordinates: pos });
    fetch(`http://localhost:8081/weather?lat=${pos.coords.latitude}&long=${pos.coords.longitude}`)
      .then(response => response.json())
      .then(data => this.setState({
        placeName: data.placeName,
        currentWeather: data.currentWeather,
        forecast: data.forecast
      }))
      .catch(err => console.log(err));

  }

  setWeatherDataFromPlaceName(currentWeather, forecast, placeName) {
    this.setState({ 
      placeName: placeName,
      currentWeather: currentWeather, 
      forecast: forecast });
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
            setWeatherDataFromPlaceName={(curr, fore, place) => this.setWeatherDataFromPlaceName(curr, fore, place)} />
          <CurrentWeather data={this.state.currentWeather} placeName={this.state.placeName} />
          <div className='forecast'>{forecastDays}</div>
          <Footer isMainPage={true}/>
        </div>
      )
    }
    else {
      return (
        <LandingPage
          setLocation={(pos) => this.setLocation(pos)}
          setWeatherDataFromPlaceName={(curr, fore, place) => this.setWeatherDataFromPlaceName(curr, fore, place)} />
      )
    }


  }
}

export default App;
