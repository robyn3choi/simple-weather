/*global google*/
import { useRef, useState } from 'react';
import Script from 'react-load-script';
import './SearchBar.css';

export default function SearchBar(props) {
  const [hasLoadedGoogleMaps, setHasLoadedGoogleMaps] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef(null);
  let autocomplete;

  function handleSearchBarFocus() {
    if (!hasLoadedGoogleMaps) {
      handleGoogleMapsScriptLoad();
    }
  }

  function handleGoogleMapsScriptLoad() {
    var autocompleteOptions = { types: ['(cities)'] };
    autocomplete = new google.maps.places.Autocomplete(inputRef.current, autocompleteOptions);

    autocomplete.addListener('place_changed', handlePlaceSelect);
    setHasLoadedGoogleMaps(true);
  }

  function handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = autocomplete.getPlace();
    let address = addressObject.address_components;
    if (address) {
      setSearchQuery(addressObject.formatted_address);
    } else {
      console.log('invalid address');
    }
  }

  return (
    <div className="search-bar-container">
      <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCz0DDEzdxfkoZSvg2v3dKhZjJvgZX426A&libraries=places,geometry" />
      <div className="search-bar">
        <div className="search-bar__input-and-button">
          <input
            type="text"
            className="search-bar__input"
            ref={inputRef}
            onFocus={handleSearchBarFocus}
            placeholder="Enter a city..."
          />
          <button className="search-bar__button" onClick={() => props.setWeatherDataFromPlaceName(searchQuery)}>
            <img className="search-bar__button-icon" alt="search" src="/icons/search.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
