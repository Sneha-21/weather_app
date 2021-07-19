import {useState} from 'react';
import img1 from './icons/animated/thunder.svg';
import img2 from './icons/animated/rainy-2.svg';
import img3 from './icons/animated/rainy-6.svg';
import img4 from './icons/animated/snowy-6.svg';
import img5 from './icons/animated/cloudy-day-3.svg';
import img6 from './icons/animated/cloudy.svg';
import img8 from './icons/animated/tornado.png';
import img7 from './icons/animated/mist.png';
import moment from 'moment';
const api={
  key: "1f18e4e85dd26a67cd2ab3469bdfd151",
  base: "https://api.openweathermap.org/data/2.5/"
}
function Initial(){
  return(
    <div className="intro">
      Wanna know the weather of different
      cities? <br></br>Don't worry! <br></br>Iam here to help you!!

    </div>
  );
}
function Icons(props)
{
  var desc=props.description;
  switch(desc)
  {
    case "Thunderstorm":
      return <div><img src={img1} /></div>;
    case "Drizzle":
      return <div><img src={img2} /></div>;
    case "Rain":
      return <div><img src={img3} /></div>;
    case "Snow":
      return <div><img src={img4} /></div>;
    case "Clear":
      return <div><img src={img5} /></div>;
    case "Clouds":
        return <div><img src={img6} /></div>;
    case "Tornado":
          return <div><img src={img8} /></div>;
    default:
      return <div><img src={img7} /></div>;
  } 
}

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>
        {
          setWeather(result);
        setQuery('');
        
        console.log(result);
    }
      );
}
  }
  return (
  <div className="app ">
    <main>
      <div className="search-box">
        <input type="text" className="search" placeholder="Search..."
        onChange={e=>setQuery(e.target.value)}
        value={query} 
        onKeyPress={search}
        />  
      </div>
      {(typeof weather.main !="undefined")?(
    <div>
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <br></br>
       <div className="date">{moment().format('LLLL')}</div>   
      </div>
      
      <div className="weather-box">
        <Icons description={weather.weather[0].main}/>
        <div className="weather">{weather.weather[0].main}</div>
        <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
      </div>
      
    </div>
      ):(<Initial/>)}
    </main>
  </div>
  );
}

export default App;
