import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
  state = { isLocationStored: localStorage.getItem('placeName') && true }

  removeStoredLocation = () =>{
    localStorage.removeItem('placeName');
    this.setState({isLocationStored: false});
  }

  render() {
    //const buttonText = this.state.isLocationStored ? 'Forget my location' : 'Your location is no longer stored';
    return (
      <div className={`footer ${this.props.isMainPage ? 'footer_main-page' : 'footer_landing-page'}`}>
        {/* <div className='footer__line'>
          {this.props.isMainPage ? (
            <button className='footer__button' disabled={!this.state.isLocationStored} onClick={this.removeStoredLocation}>
              {buttonText}
            </button>)
            : null}
        </div> */}
        <div className='footer__line'>
          <a href='https://github.com/robyn3choi/simple-weather/blob/master/TermsOfUseAndPrivacyPolicy.md' className='footer__link' target='_blank' rel='noopener noreferrer'>
            Terms of Use and Privacy Policy
          </a>
        </div>
        <div className='footer__line'>
          Icons from <a href='https://github.com/zagortenay333/Tempestacons'>Tempestacons</a> and formatted by <a href='https://github.com/rickellis/SVG-Weather-Icons'>rickellis</a>
        </div>
      </div>
    );
  }
}

export default Footer;