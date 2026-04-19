import './App.css'
import warmBg from './assets/warm-background.jpg'
import React, {useState} from 'react';


function App() {
  const dateBuilder = (d) => {
    const months = ["January","February","March","April","May","June",
      "July","August","September","October", "November","December",];

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
      "Friday","Saturday",];
      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  const [query, setQuery]  = useState('');
const [weather, setWeather]  = useState({});

/*fetch request to connect to backend */
const search = evt => {
  if (evt.key == "Enter") {
      fetch(`http://localhost:5000/weather?city=${encodeURIComponent(query.trim())}`)
  .then(res => res.json())
  .then(result => {
  setWeather(result);
  setQuery('');
  console.log(result);
    });
}
}
  return(

      <div className= {
        (typeof weather.main != "undefined") ? ((weather.main.temp > 60) ? 
        'app warm' : 'app cold') : 'app' }>
      
  <main>
    <div className="search-box">
      <input
      type = "text"
      className = "search-bar"
      placeholder = "Search..."
      
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={search}
      /> 

    </div>
  {(typeof weather.main != "undefined") ? (
    <div>
      <div className="location-box">
      <div className = "location">{weather.name}, {weather.sys.country} </div>
      <div className = "date">{dateBuilder(new Date())} </div>
    </div>
      <div className = "weather-box">
      <div className = "temp">
        {Math.round(weather.main.temp)}°F
        </div>
       
      <div className = "weather"> {weather.weather[0].main} </div>
      </div>
      </div>
     ) : ('')}
     
  </main>
</div>
  );

}


export default App
