import temp from '../assets/temp.png'
import max_temp from '../assets/warm.png'
import min_temp from '../assets/cold.png'
import humidity from '../assets/humidity.png'
import sunrise from '../assets/sunrise.png'
import night from '../assets/night.png'
import wind_speed from '../assets/wind.png'
import cels from '../assets/celsius_degrees.png'
import { ICON_URL } from '../constants'
import { DailyForecast } from '../daily-forecast/daily-forecast'
import './current_forecast.css'

export const CurrentForecast = ({ data, sunTimeConvert, forecast }) => {
    const { main, name, sys, weather, wind } = data;
    return (
        <div className="weather_forecast">
            <h2 className='weather_city'>{name}, {sys?.country}</h2>
            {weather?.map(({ id, description }) => {
                return <p className='weather_clouds' key={id}>{description}</p>
            })}
            <div className='weather_current'>
                <div className='weather_status'>
                    {weather?.map(({ id, icon }) => {
                        return <img src={`${ ICON_URL }${ icon }@4x.png`} alt="weather_icon" key={id} />
                    })}
                </div>
                <div className='weather_current_temp'>
                    <p>{main?.temp}</p>
                    <img src={cels} alt="cels" />
                </div>
                <div className='weather_current_additional'>
                    <div>
                        <img src={temp} alt="feels_like" className='forecast_icon' />
                        <p>{main?.feels_like}{'\u00b0'}</p>
                    </div>
                    <div>
                        <img src={humidity} alt="humidity" className='forecast_icon' />
                        <p>{main?.humidity}, %</p>
                    </div>
                    <div>
                        <img src={wind_speed} alt="wind" className='forecast_icon' />
                        <p>{wind?.speed}, m/s</p>
                    </div>
                </div>
            </div>
            <div className="weather_details">
                <div>
                    <img src={min_temp} alt="temp_min" className='forecast_icon' />
                    <p>{main?.temp_min}{'\u00b0'}</p>
                </div>
                <div>
                    <img src={max_temp} alt="temp_max" className='forecast_icon' />
                    <p>{main?.temp_max}{'\u00b0'}</p>
                </div>
                <div>
                    <img src={sunrise} alt="sunrise" className='forecast_icon' />
                    <p>{sunTimeConvert(sys?.sunrise)}</p>
                </div>
                <div>
                    <img src={night} alt="sunset" className='forecast_icon' />
                    <p>{sunTimeConvert(sys?.sunset)}</p>
                </div>
            </div>
            <DailyForecast forecast={forecast} />
        </div>
    )
}