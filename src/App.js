import React, { Component } from 'react';
import './App.css';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import ForecastDay from './Forecast/ForecastDay';
import LandingPage from './LandingPage/LandingPage';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import axios from 'axios';

class App extends Component {
  state = {
    coordinates: null,
    placeName: null,
    currentWeather: null,
    forecast: null,
    units: null,
    entries: 0
  }

  componentDidMount() {
    const storedPlaceName = localStorage.getItem('placeName');
    if (storedPlaceName) {
      this.setState({placeName: storedPlaceName});
      this.setWeatherDataFromPlaceName(storedPlaceName);
    }
  }

  areCoordsSameAsStored = (coords) => {
    return !this.state.coordinates || (this.state.coordinates && coords.lat !== this.state.coordinates.lat 
      && coords.long !== this.state.coordinates.long);
  }

  setWeatherDataFromPosition(coords) {
    if (this.areCoordsSameAsStored(coords)) {
      axios.get(`https://api.howsthesky.com/weather?lat=${coords.lat}&long=${coords.long}`)
        .then(res => {
          localStorage.setItem('placeName', res.data.placeName);
          this.setState({
            coordinates: coords,
            placeName: res.data.placeName,
            currentWeather: res.data.currentWeather,
            forecast: res.data.forecast,
            units: res.data.units,
            entries: this.state.entries+1
          })
        })
        .catch(err => console.log(err));
    }
  }

  setWeatherDataFromPlaceName(placeName) {
    if (placeName !== this.state.placeName) {
      axios.get(`https://api.howsthesky.com/search?placename=${placeName}`)
      .then(res => {
        localStorage.setItem('placeName', placeName);
        this.setState({
          coordinates: null,
          placeName: placeName,
          currentWeather: res.data.currentWeather,
          forecast: res.data.forecast,
          units: res.data.units,
          entries: this.state.entries+1
        })
      })
      .catch(err => console.log(err));
    }
  }

  openPrivacyPolicy = () => {
    this.setState({isPrivacyPolicyOpen: true});
  }

  render() {
    const { placeName, currentWeather, forecast, units, entries } = this.state;
    if (currentWeather && forecast) {
      const forecastDays = forecast.map((day, i) =>
        <ForecastDay key={'forecast-day-' + i} data={day} index={i} units={units} entries={entries} />
      );
      return (
        <div className='app'>
          <Header
            setWeatherDataFromPosition={(pos) => this.setWeatherDataFromPosition(pos)}
            setWeatherDataFromPlaceName={(place) => this.setWeatherDataFromPlaceName(place)} />
          <CurrentWeather data={currentWeather} placeName={placeName} units={units} entries={entries}/>
          <div className='forecast'>{forecastDays}</div>
          <Footer isMainPage={true} />
        </div>
      )
    }
    else if (!this.state.placeName) {
      return (
        <LandingPage
          setWeatherDataFromPosition={(pos) => this.setWeatherDataFromPosition(pos)}
          setWeatherDataFromPlaceName={(place) => this.setWeatherDataFromPlaceName(place)} />
      )
    }
    else {
      return null;
    }
  }
}

export default App;
