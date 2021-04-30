import DetectMyLocation from '../DetectMyLocation/DetectMyLocation';
import SearchBar from '../SearchBar/SearchBar';
import FadeIn from '../FadeIn/FadeIn';
import './Header.css';

export default function Header() {
  return (
    <FadeIn timeout={400}>
      <div className="header">
        <DetectMyLocation />
        <div className="or">Or</div>
        <SearchBar />
      </div>
    </FadeIn>
  );
}
