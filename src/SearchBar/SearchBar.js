import React, { Component } from 'react';
import Script from 'react-load-script';
import { CSSTransition } from 'react-transition-group';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSearchBarBeenFocused: false,
      city: '',
      query: ''
    };

    this.inputRef = React.createRef();
  }

  handleGoogleMapsScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.current,
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', () => this.handlePlaceSelect());
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    if (address) {
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
    else {
      console.log("invalid address")
    }
  }

  search() {
    fetch(`http://localhost:8081/citysearch?placename=${this.state.query}`)
      .then(response => response.json())
      .then(data => this.props.setWeatherData(data.currentWeather, data.forecast))
      .catch(err => console.log(err));
  }

  onSearchBarFocus() {
    if (!this.state.hasSearchBarBeenFocused) {
      this.handleGoogleMapsScriptLoad();
      this.setState({ hasSearchBarBeenFocused: true });
    }
  }

  render() {
    return (
      <div className='search-bar-container'>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCz0DDEzdxfkoZSvg2v3dKhZjJvgZX426A&libraries=places,geometry"
          onLoad={() => console.log("google maps loaded")}
        />
        <div className='search-bar'>
          <div className='search-bar__input-and-button'>
            <input type="text" className="search-bar__input" ref={this.inputRef} onFocus={() => this.onSearchBarFocus()} placeholder="Enter a city..." />
            <button className='search-bar__button' onClick={() => this.search()}>
              <img className='search-bar__button-icon' alt='search' src='/icons/search.svg' />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;