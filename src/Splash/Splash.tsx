import DetectMyLocation from '../DetectMyLocation/DetectMyLocation';
import SearchBar from '../SearchBar/SearchBar';
import FadeIn from '../FadeIn/FadeIn';
import Footer from '../Footer/Footer';
import './Splash.css';

export default function Splash() {
  return (
    <div className="splash">
      <FadeIn timeout={50}>
        <DetectMyLocation />
      </FadeIn>
      <FadeIn timeout={50}>
        <div className="or">Or</div>
      </FadeIn>
      <FadeIn timeout={50}>
        <SearchBar />
      </FadeIn>
      <Footer isMainPage={false} />
    </div>
  );
}
