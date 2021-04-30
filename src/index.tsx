import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherDataProvider } from './WeatherProvider';

ReactDOM.render(
  <WeatherDataProvider>
    <App />
  </WeatherDataProvider>,
  document.getElementById('root')
);
