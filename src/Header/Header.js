import React, { Component } from 'react';
import DetectMyLocation from './../DetectMyLocation/DetectMyLocation';
import SearchBar from './../SearchBar/SearchBar';
import { CSSTransition } from 'react-transition-group';
import './Header.css';

class Header extends Component {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    return (
      <CSSTransition in={this.state.isMounted} classNames="fade" timeout={400}>
      <div className='header'>
          <DetectMyLocation isLandingPage={false}
            setLocation={(pos) => this.props.setLocation(pos)} />
          <div className='or'>Or</div>
          <SearchBar isLandingPage={false}
            setLocation={(pos) => this.props.setLocation(pos)}
            setWeatherDataFromPlaceName={(curr, fore, place) => this.props.setWeatherDataFromPlaceName(curr, fore, place)} />
      </div>
      </CSSTransition>
    );
  }
}

export default Header;