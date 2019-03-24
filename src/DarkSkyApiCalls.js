export const getCurrentWeatherFromPos = (pos) => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/97000aa43d3d59bd61be8c8212d85bf5/${pos.coords.latitude},${pos.coords.longitude}?units=auto`;
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return {
        description: json.currently.summary,
        icon: json.currently.icon,
        temperature: Math.round(json.currently.temperature)
      }
    });
}
//(floor(T / 86400) + 4) mod 7
export const getForecastFromPos = (pos) => {
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/97000aa43d3d59bd61be8c8212d85bf5/${pos.coords.latitude},${pos.coords.longitude}?units=auto&exclude=currently,minutely,hourly,alerts,flags`;
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      return json.daily.data.map((day, i) => {
        const date = new Date(day.time * 1000);
        return {
          weekday: date.getDay(),
          month: date.getMonth(),
          date: date.getDate(),
          description: day.summary,
          icon: day.icon,
          tempHigh:  Math.round(day.temperatureHigh),
          tempLow:  Math.round(day.temperatureLow),
          wind:  Math.round(day.windSpeed),
          precipChance: day.precipProbability * 100
        };
      })
    });
}
