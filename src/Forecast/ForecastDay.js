import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ForecastDay.css';

class ForecastDay extends Component {
  state = { isMounted: false }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <CSSTransition in={this.state.isMounted} classNames="fade" timeout={160+80*this.props.index}>
        <div className={`forecast-day ${this.props.index % 2 === 0 ? 'forecast-day_light' : ''}`}>
          <div className='forecast-day__weekday-date'>
            <div className='forecast-day__weekday'>{this.props.index === 0 ? 'Today' : weekdayNames[this.props.data.weekday]}</div>
            <div className='forecast-day__date'>{this.props.data.month + 1}/{this.props.data.date}</div>
          </div>
          <img className='forecast-day__main-icon' alt='weather-icon' src={'/icons/' + this.props.data.icon + '.svg'} />
          <div className='forecast-day__description'>{this.props.data.description}</div>
          <div className='forecast-day__icons-with-text'>
            <div className='forecast-day__icon-with-text'>
              <img className='forecast-day__icon' alt='temperature' src={'/icons/temperature.svg'} />
              <div className='forecast-day__icon-text'>{this.props.data.tempHigh}&deg;/{this.props.data.tempLow}&deg;</div>
            </div>
            <div className='forecast-day__icon-with-text'>
              <img className='forecast-day__icon' alt='wind-speed' src={'/icons/wind.svg'} />
              <div className='forecast-day__text'>{this.props.data.wind}<span className='forecast-day__wind-speed-units'> km/h</span></div>
            </div>
            <div className='forecast-day__icon-with-text'>
              <img className='forecast-day__icon' alt='probability-of-precipitation' src={'/icons/umbrella.svg'} />
              <div className='forecast-day__text'>{this.props.data.precipChance}%</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default ForecastDay;