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
    forecast: null,
    units: '',
    entries: 0
  }

  componentDidMount() {
    const storedPlaceName = localStorage.getItem('placeName');
    if (storedPlaceName) {
      this.setWeatherDataFromPlaceName(storedPlaceName);
    }
  }

  areCoordsSameAsStored = (coords) => {
    return !this.state.coordinates || (this.state.coordinates && coords.lat !== this.state.coordinates.lat 
      && coords.long !== this.state.coordinates.long);
  }

  setWeatherDataFromPosition(coords) {
    if (this.areCoordsSameAsStored(coords)) {
      fetch(`https://api.howsthesky.com/weather?lat=${coords.lat}&long=${coords.long}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('placeName', data.placeName);
          this.setState({
            coordinates: coords,
            placeName: data.placeName,
            currentWeather: data.currentWeather,
            forecast: data.forecast,
            units: data.units,
            entries: this.state.entries+1
          })
        })
        .catch(err => console.log(err));
    }
  }

  setWeatherDataFromPlaceName(placeName) {
    if (placeName !== this.state.placeName) {
      fetch(`https://api.howsthesky.com/search?placename=${placeName}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('placeName', placeName);
        this.setState({
          coordinates: null,
          placeName: placeName,
          currentWeather: data.currentWeather,
          forecast: data.forecast,
          units: data.units,
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
    else {
      return (
        <LandingPage
          setWeatherDataFromPosition={(pos) => this.setWeatherDataFromPosition(pos)}
          setWeatherDataFromPlaceName={(place) => this.setWeatherDataFromPlaceName(place)} />
      )
    }


  }
}

export default App;
