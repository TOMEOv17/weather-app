import './styles/app.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
function App() {
  const [data, setData] = useState(),
        [forecastData, setForecastData] = useState(),
        [city, setCity] = useState("Dallas"),
        [units, setUnits] = useState("metric")
  const key = "f5f6ec3eb55a2940c48cf4fdf1518485"
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=${units}&appid=${key}`
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?&q=${city}&units=${units}&appid=${key}`

  const currWeather = axios.get(BASE_URL)
  const forecast = axios.get(FORECAST_URL)

  useEffect(() => {
    currWeather.then(res => setData(res.data))
    .catch(err => console.log(`An unexpected error has occured: ${err}`))
    forecast.then(res => setForecastData(res.data))
    .catch(err => console.log(`An unexpected error has occured: ${err}`))
  }, [])

  const fetchWeatherData = (e) => {
    if(e.key === "Enter"){
        currWeather.then(res => setData(res.data))
        .catch(err => console.log(`An unexpected error has occured: ${err}`))
        
        forecast.then(res => setForecastData(res.data))
        .catch(err => console.log(`An unexpected error has occured: ${err}`))
      }
  }

  const cityUpdate = (e) => {
    setCity(e.target.value)
  }

  return (
    <div className="app">

      <div className="current_weather">
        <input type="text" placeholder="Enter location..." onChange={cityUpdate} value={city} onKeyDown={fetchWeatherData}/>
        {data && (
          <div className="overall">
            <p>{data.name}</p>
            <h1>{data.main.temp}{units==="metric" ? "°C" : "°F"}</h1>
            <p>{data.weather[0].main}</p>
          </div>
        )}
        {data && (
          <div className="details">
            <div className="feels_like">
              <b>{data.main.feels_like}{units==="metric" ? "°C" : "°F"}</b>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <b>{data.main.humidity}%</b>
              <p>Humidity</p>
            </div>
            <div className="wind_speed">
              <b>{data.wind.speed} {units==="metric" ? "k/h" : "MPH"}</b>
              <p>Wind Speed</p>
            </div>
            <div className="pressure">
              <b>{data.main.pressure} hPa</b>
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>

      <div className="forecast">
        {forecastData && forecastData.list.map(elem=>(
          <div className="forecast_day" key={elem.dt}>
            <p className='day'>{elem.dt_txt.slice(8, 9)}{elem.dt_txt.slice(9, 10)}</p>
            <p>{elem.dt_txt.slice(10, 16)}</p>
            <b>{elem.main.temp.toFixed(1)}{units==="metric" ? "°C" : "°F"}</b>
            <p>{elem.weather[0].main}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
