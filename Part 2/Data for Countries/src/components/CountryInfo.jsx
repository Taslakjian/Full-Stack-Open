import axios from "axios";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const CountryInfo = (props) => {
    if (!props.chosenCountry) {
        return null;
    }

    const [capitalWeather, setCapitalWeather] = useState(null);

    const { chosenCountry } = props;
    const { name, capital, area, languages, flags, capitalInfo } = chosenCountry;
    const iterableLanguages = Object.values(languages);
    const [latitude, longitude] = capitalInfo.latlng;
    const api_key = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
            .then(response => {
                const data = response.data;
                setCapitalWeather(data);
            });
    }, []);

    return (
        <>
            <h1>{name.common}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            <ul>
                {
                    iterableLanguages.map((lang) => <li key={lang}>{lang}</li>)
                }
            </ul>
            <img src={flags.png} alt={`Flag of ${name.common}`} />
            {
                capitalWeather 
                ? <Weather capital={capital} capitalWeather={capitalWeather} /> 
                : null
            }
        </>
    )
};

export default CountryInfo;