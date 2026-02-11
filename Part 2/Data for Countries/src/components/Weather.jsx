import { useEffect, useState } from "react";
import axios from "axios";

const Weather = (props) => {
    const { capital, capitalWeather } = props;
    const api_key = import.meta.env.VITE_API_KEY;

    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
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