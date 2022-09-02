import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [forecast, setForecast] = useState({});  

    useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/forecast?lat=56.6739826&lon=12.8574827&appid=ac38ec02d861484a3903df5dd9d1eac9&units=metric')
      .then(res => res.json())
      .then(data => {
        console.log(data.list[0].dt);
        setForecast(data);
      })
    }, [])
    

  return (
    <div className="App">
      <h1>Weatherhino</h1>
      {forecast.list && 
         <p>{forecast.list[0].weather[0].main}</p> 
      }
     
    </div>
  );
}

export default App;
