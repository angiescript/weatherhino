import { useState, useEffect } from 'react';
import './App.css';

  function App() {

  const [forecast, setForecast] = useState({});  

  const getWeatherData = () => {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?lat=56.6739826&lon=12.8574827&appid=ac38ec02d861484a3903df5dd9d1eac9&units=metric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
  };


  const getLocalStorage = () => {
    try {
     let temp = JSON.parse(localStorage.getItem('weatherhinoForecast'));
     if (temp.list && temp.list.length > 0) {
      return temp;
     }
    } catch (error) {
      console.error(error)
     
    }
    console.log('No weather in local storage.')
    return null;
  }

  const setLocalStorage = (newForecast) => {
    localStorage.setItem('weatherhinoForecast', JSON.stringify(newForecast));
  }

  const updateIfNeeded = (current) => {
     if (current.list && current.list.length > 0) {
      const now = Date.now();
      if (current.list[0].dt < now) {
        setLocalStorage(getWeatherData());
      }
     }
    }
  

    useEffect(() => {
    //getLocalStorage
    let currentForecast = getLocalStorage();
    //if currentForecast 
    if (currentForecast != null) {
      //setForecast = det som fanns i localStorage
      console.log('currentForecast hämtat från localStorage')
      setForecast(currentForecast);
      updateIfNeeded(currentForecast);
    } else {
      //else getWeatherData och sätt i localStorage + setForecast
      console.log('inget finns i local storage')
      getWeatherData()
      .then(data => {
        console.log(data);
        setForecast(data);
        setLocalStorage(data);
      })
    }
   
    // eslint-disable-next-line 
    }, []);

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
