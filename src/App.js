import './styles/app.css'

function App() {
  return (
    <div className="app">

      <div className="current_weather">
        <input type="text" placeholder="Enter location..."/>
        <div className="overall">
          <p>New York</p>
          <h1>34°C</h1>
          <p>Clouds</p>
        </div>
        <div className="details">
          <div className="feels_like">
            <b>33.6°F</b>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <b>70%</b>
            <p>Humidity</p>
          </div>
          <div className="wind_speed">
            <b>1.99 MPH</b>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>

      <div className="forecast"></div>

    </div>
  );
}

export default App;
