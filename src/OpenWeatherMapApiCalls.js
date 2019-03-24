export const getCurrentWeatherFromPos = (pos) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=db5aa8d71a427a6107652a622b78d0ff`;
  return fetch(url)
     .then(response => response.json())
     .then(json => { 
       return {
         description: json.weather[0].description,
         icon: `http://openweathermap.org/img/w/${json.weather[0].icon}.png`,
         temperature: json.main.temp,
         wind: json.wind.speed,
      }
     });
}

export const getForecastFromPos = (pos) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&APPID=db5aa8d71a427a6107652a622b78d0ff`;
  return fetch(url)
     .then(response => response.json())
     .then(json => { 
       console.log(json);
     });
}
