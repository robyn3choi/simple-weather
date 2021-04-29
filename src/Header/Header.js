import DetectMyLocation from './../DetectMyLocation/DetectMyLocation';
import SearchBar from './../SearchBar/SearchBar';
import FadeIn from './../FadeIn/FadeIn';
import './Header.css';

export default function Header(props) {
  return (
    <FadeIn timeout={400}>
      <div className="header">
        <DetectMyLocation setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)} />
        <div className="or">Or</div>
        <SearchBar
          setWeatherDataFromPosition={(pos) => props.setWeatherDataFromPosition(pos)}
          setWeatherDataFromPlaceName={(place) => props.setWeatherDataFromPlaceName(place)}
        />
      </div>
    </FadeIn>
  );
}
