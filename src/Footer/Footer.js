import './Footer.css';

export default function Footer(props) {
  return (
    <div className={`footer ${props.isMainPage ? 'footer_main-page' : 'footer_landing-page'}`}>
      <div className="footer__line">
        <a
          href="https://github.com/robyn3choi/simple-weather/blob/master/TermsOfUseAndPrivacyPolicy.md"
          className="footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Use and Privacy Policy
        </a>
      </div>
      <div className="footer__line">
        Icons from <a href="https://github.com/zagortenay333/Tempestacons">Tempestacons</a> and formatted by{' '}
        <a href="https://github.com/rickellis/SVG-Weather-Icons">rickellis</a>
      </div>
    </div>
  );
}
