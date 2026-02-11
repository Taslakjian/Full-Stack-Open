import axios from "axios";

const capitalUrl = "https://api.openweathermap.org/data/3.0/onecall";
const iconUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_API_KEY;

const getCapitalWeather = (latitude, longitude) => {
    return axios.get(`${capitalUrl}?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`);
};

const getWeatherIcon = (capital) => {
    return axios.get(`${iconUrl}?q=${capital}&appid=${api_key}`);
};

export default { getCapitalWeather, getWeatherIcon };