import { ICON_URL } from '../constants'
import max_temp from '../assets/warm.png'
import './daily-forecast.css'


export const DailyForecast = ({ forecast }) => {

    const getDayFromDate = (dt_txt) => {
        const daysAndTime = dt_txt.split(' ')
        let day = daysAndTime[0]
        const formattedDay = new Date(day).toLocaleDateString('en-us', { weekday: 'short', month: 'short', day: 'numeric' })
        return formattedDay
    }

    const getHourFromDate = (dt_txt) => {
        const daysAndTime = dt_txt.split(' ')
        let hour = daysAndTime[1].slice(0, 5)
        return hour
    }

    return (
        <div className="daily_forecast_block">
            <h2>Daily and hourly weather forecast</h2>
            <div className='daily_forecast_wrapper'>
                {forecast?.list?.filter((_, index) => index <= 11).map(({ main, weather, dt_txt }) => {
                    return (
                        <div key={dt_txt} className='daily_forecast_item'>
                            <p>{getDayFromDate(dt_txt)}</p>
                            <p>{getHourFromDate(dt_txt)}</p>
                            <div className='daily_temp'>
                                <img src={max_temp} alt="temp_max" className='forecast_icon' />
                                {main?.temp_max}{'\u00b0'}
                            </div>
                            <div className='weather_status'>
                                <img src={`${ ICON_URL }${ weather[0]?.icon }@4x.png`} alt="weather_icon" className='daily_weather_icon' />
                                {weather[0]?.description}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}