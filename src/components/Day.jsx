const Day = (data) => {
    return (
      <> 
        {data.data.weather && data.data.weather[0] &&
          <div>
            <p>{data.data.weather[0].main}</p>
            <img src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`} alt="weather icon"/>
            <p class="small-text"><b>{Math.round(data.data.main.temp_max)}°C</b> | {Math.round(data.data.main.temp_min)} °C</p>
            <p>{data.data.dt_txt.slice(10, 16)}</p>
          </div>
        }
      </>
    );
  };
  
  export default Day;