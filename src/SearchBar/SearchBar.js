import React, { Component } from 'react';
import Script from 'react-load-script';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      query: ''
    };

    this.inputRef = React.createRef();
  }

  handleScriptLoad() {
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

    console.log(address[0].long_name)
    console.log(addressObject.formatted_address)

    if (address) {
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCz0DDEzdxfkoZSvg2v3dKhZjJvgZX426A&libraries=places,geometry"
          onLoad={() => this.handleScriptLoad()}
        />
        <label htmlFor="city-search">City Name</label>
        <input type="text" id="search-bar" ref={this.inputRef} placeholder="e.g. Vancouver, BC" />
      </div>
    );
  }
}

export default SearchBar;