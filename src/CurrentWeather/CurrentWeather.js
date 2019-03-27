import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CurrentWeather.css';

class CurrentWeather extends Component {
  state = { isMounted: false }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    return (
      <div className='current-weather'>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={0}>
          <div>
            <div className='place-name'>{`In ${this.props.placeName}, it's:`}</div>
            <div className='current-weather__icon-temp-container'>
              <div className='current-weather__temp'>{this.props.data.temperature}&deg;</div>
              <img className='current-weather__icon' alt='weather-icon' src={'/icons/' + this.props.data.icon + '.svg'} />
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={80}>
          <div className='current-weather__description'>{this.props.data.description}</div>
        </CSSTransition>
      </div>
    );
  }

}

export default CurrentWeather;