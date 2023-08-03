import './styles/app.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
function App() {
  const [data, setData] = useState(),
        [city, setCity] = useState("Dallas")
  const key = "f5f6ec3eb55a2940c48cf4fdf1518485"
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${key}`


  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => setData(res.data))
  }, [])


  const fetchWeatherData = (e) => {
    if(e.key === "Enter"){
      axios.get(BASE_URL)
        .then(res => setData(res.data))
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
            <h1>{data.main.temp}°F</h1>
            <p>{data.weather[0].main}</p>
          </div>
        )}
        {data && (
          <div className="details">
            <div className="feels_like">
              <b>{data.main.feels_like}°F</b>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <b>{data.main.humidity}%</b>
              <p>Humidity</p>
            </div>
            <div className="wind_speed">
              <b>{data.wind.speed} MPH</b>
              <p>Wind Speed</p>
            </div>
            <div className="pressure">
              <b>{data.main.pressure} hPa</b>
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>

      <div className="forecast"></div>

    </div>
  );
}

export default App;
