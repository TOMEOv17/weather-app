import './styles/app.css'
import {useState, useEffect, useRef} from 'react'
function App() {
  const [data, setData] = useState(),
        [city, setCity] = useState("dallas"),
        input = useRef()
  const key = "f5f6ec3eb55a2940c48cf4fdf1518485"
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${key}`

  const fetchWeatherData = (e) => {
    if(e.key === "Enter"){
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => setData(data.main))
    }
  }

  const cityUpdate = (e) => {
    setCity(e.target.value)
  }

  useEffect(() => {
    input.current.value = ''
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  console.log(data);
  return (
    <div className="app">

      <div className="current_weather">
        <input type="text" placeholder="Enter location..." onChange={cityUpdate} value={city} ref={input} onKeyDown={fetchWeatherData}/>
        <div className="overall">
          <p>{data.name}</p>
          <h1>{data.main.temp}°F</h1>
          <p>{data.weather[0].main}</p>
        </div>
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
      </div>

      <div className="forecast"></div>

    </div>
  );
}

export default App;
