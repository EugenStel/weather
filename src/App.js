import { useState } from 'react';
import { SearchBar } from './search-bar/search-bar';
import { CurrentForecast } from './current-forecast/current-forecast';
import { Loader } from './loader/loader';
import { BASE_WEATHER_URL } from './constants';
import './App.css';

export const App = () => {
  const [data, setData] = useState([])
  const [forecast, setForecast] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [city, setCity] = useState('')

  const inputChangeHandler = ({ target }) => {
    fetch(`${ BASE_WEATHER_URL }forecast?q=${ target.value }&appid=${ process.env.REACT_APP_API_KEY }&units=metric`)
      .then((response) => response.json())
      .then((resp) => {
        resp?.cod === '404' ? setIsLoaded(false) : setIsLoaded(true)
        setForecast(resp)
      })

    fetch(`${ BASE_WEATHER_URL }weather?q=${ target.value }&appid=${ process.env.REACT_APP_API_KEY }&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        data?.cod === '404' ? setIsLoaded(false) : setIsLoaded(true)
        setData(data)
      })
    setCity(target.value)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`${ BASE_WEATHER_URL }forecast?lat=${ position.coords.latitude }&lon=${ position.coords.longitude }&appid=${ process.env.REACT_APP_API_KEY }&units=metric`)
        .then((response) => response.json())
        .then((resp) => {
          resp?.cod === '404' ? setIsLoaded(false) : setIsLoaded(true)
          setForecast(resp)
        })
      fetch(`${ BASE_WEATHER_URL }weather?lat=${ position.coords.latitude }&lon=${ position.coords.longitude }&appid=${ process.env.REACT_APP_API_KEY }&units=metric`)
        .then((response) => response.json())
        .then((data) => {
          data?.cod === '404' ? setIsLoaded(false) : setIsLoaded(true)
          setData(data)
        })
    })
    setCity('')
  }

  const getDate = () => {
    const today = new Date().toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    return today
  }

  const sunTimeConvert = (unixTime) => {
    return new Date(unixTime * 1000).toLocaleTimeString()
  }

  return (
    <div className="App">
      <div className='container'>
        <SearchBar getLocation={getLocation} inputChangeHandler={inputChangeHandler} city={city} />
        <div className='local_date'>
          {getDate()}
        </div>
        {isLoaded ?
          <CurrentForecast data={data} sunTimeConvert={sunTimeConvert} forecast={forecast} />
          :
          <Loader />
        }
      </div>
    </div>
  );
}