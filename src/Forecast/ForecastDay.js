import { createRef, Component } from 'react';
import FadeIn from './../FadeIn/FadeIn';
import * as Constants from './../Constants';
import './ForecastDay.css';

class ForecastDay extends Component {
  constructor(props) {
    super(props);
    this.state = { descHasSmallerFont: false };
    this.descRef = createRef();
  }

  componentDidMount() {
    this.descHeight = this.descRef.current.scrollHeight;
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  handleResize = () => {
    this.setState({ descHasSmallerFont: this.descHeight > this.descRef.current.clientHeight });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data.description !== this.props.data.description) {
      this.descHeight = this.descRef.current.scrollHeight;
      this.handleResize();
    }
  }

  render() {
    return (
      <FadeIn timeout={160 + 80 * this.props.index}>
        <div className={`forecast-day ${this.props.index % 2 === 0 ? 'forecast-day_light' : ''}`}>
          <div className="forecast-day__weekday-date">
            <div className="forecast-day__weekday">
              {this.props.index === 0 ? 'Today' : Constants.WEEKDAY_NAMES[this.props.data.weekday]}
            </div>
            <div className="forecast-day__date">
              {this.props.data.month + 1}/{this.props.data.date}
            </div>
          </div>
          <img className="forecast-day__main-icon" alt="weather-icon" src={'/icons/' + this.props.data.icon + '.svg'} />
          <div
            className={`forecast-day__description ${
              this.state.descHasSmallerFont ? 'forecast-day__description_small' : ''
            }`}
            ref={this.descRef}
          >
            {this.props.data.description}
          </div>
          <div className="forecast-day__icons-with-text">
            <div className="forecast-day__icon-with-text">
              <img className="forecast-day__icon" alt="temperature" src={'/icons/temperature.svg'} />
              <div className="forecast-day__icon-text">
                {this.props.data.tempHigh}&deg;/{this.props.data.tempLow}&deg;
              </div>
            </div>
            <div className="forecast-day__icon-with-text">
              <img className="forecast-day__icon" alt="wind-speed" src={'/icons/wind.svg'} />
              <div className="forecast-day__text">
                {this.props.data.wind}
                <span className="forecast-day__wind-speed-units">{` ${
                  Constants.WINDSPEED_UNITS[this.props.units]
                }`}</span>
              </div>
            </div>
            <div className="forecast-day__icon-with-text">
              <img className="forecast-day__icon" alt="probability-of-precipitation" src={'/icons/umbrella.svg'} />
              <div className="forecast-day__text">{this.props.data.precipChance}%</div>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default ForecastDay;
