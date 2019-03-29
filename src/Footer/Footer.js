import React from 'react';
import './Footer.css'

const Footer = (props) => {
  return (
    <div className={`footer ${props.isMainPage ? 'footer_main-page' : 'footer_landing-page'}`}>
      <div className='footer__buttons'>
        <a href='https://github.com/robyn3choi/simple-weather/blob/master/TermsOfUseAndPrivacyPolicy.md' className='footer__link' target='_blank' rel='noopener noreferrer'>
          Terms of Use and Privacy Policy
        </a>
      </div>
      <div className='icons-attribution footer__attribution'>
        Icons from <a href='https://github.com/zagortenay333/Tempestacons'>Tempestacons</a> and formatted by <a href='https://github.com/rickellis/SVG-Weather-Icons'>rickellis</a>
      </div>
      <div className='dark-sky-attribution footer__attribution'>
        Powered by <a href='https://darksky.net/poweredby/'>Dark Sky</a>
      </div>
    </div>
  );
}

export default Footer;