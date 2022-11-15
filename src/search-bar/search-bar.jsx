import location from '../assets/location.png'
import './search_bar.css'

export const SearchBar = ({getLocation, inputChangeHandler, city}) => {
    return (
        <div className='search_bar'>
            <input type="text" placeholder='Search you city...' onChange={inputChangeHandler} value={city}/>
            <img src={location} alt="location icon"  width='50px' onClick={getLocation} title='get location'/>
        </div>
    )
}