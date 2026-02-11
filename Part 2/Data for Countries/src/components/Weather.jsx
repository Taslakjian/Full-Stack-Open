import { useEffect, useState } from "react";
import weatherSearch from "../services/weatherSearch";

const Weather = (props) => {
    const { capital, capitalWeather } = props;

    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        weatherSearch
            .getWeatherIcon(capital)
            .then((response) => {
                setImageSrc(`https://openweathermap.org/payload/api/media/file/${response.data.weather[0].icon}.png`);                
            });
    }, []);
    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>Temperature {capitalWeather.current.temp} Celsius</p>
            {
                imageSrc ? <img src={imageSrc} alt={`Weather icon for ${capital}`} /> : null
            }
            <p>Wind {capitalWeather.current.wind_speed} m/s</p>
        </>
    )
}

export default Weather;