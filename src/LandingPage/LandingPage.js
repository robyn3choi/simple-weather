import React, { Component } from 'react';
import DetectMyLocation from './../DetectMyLocation/DetectMyLocation';
import SearchBar from './../SearchBar/SearchBar';
import './LandingPage.css';
import { CSSTransition } from 'react-transition-group';
import Footer from './../Footer/Footer';

class LandingPage extends Component {
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    return (
      <div className='landing-page'>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={50}>
          <DetectMyLocation isLandingPage={true}
            setLocation={(pos) => this.props.setLocation(pos)} />
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={50}>
          <div className='or'>Or</div>
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={50}>
          <SearchBar isLandingPage={true}
            setLocation={(pos) => this.props.setLocation(pos)}
            setWeatherDataFromPlaceName={(curr, fore, place) => this.props.setWeatherDataFromPlaceName(curr, fore, place)} />
        </CSSTransition>
        <Footer isMainPage={false}/>
      </div>
    );
  }

}

export default LandingPage;