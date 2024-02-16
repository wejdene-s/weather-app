import {API_KEY} from './config.js';
import weatherData from './weatherData.js';

export const currentWeatherObj = new weatherData();

const getWeatherData = async(city) => {
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${API_KEY}`);

        if (response.status === 429) {
            console.log('API rate limit exceeded. Retry after some time.');
        } else if (!response.ok) {
            console.log('HTTP error:', response.status);
        }else{
            const data = await response.json();
            return data;
        }
    } catch (error) {
        // Handle general errors
        throw error;
    } 
}
export const extractData = async(city) => {
    const response = await getWeatherData(city);
    extractCurrentWeather(response);
    extractDate(response);
    extractWeatherParameters(response);
    extractDailyForecast(response);

}

export const extractCurrentWeather = (response) => {
    const currentWeather = {};
    currentWeather.cityName = response.city_name;
    currentWeather.temperature = `${Math.round(response.data[0].temp)}°`;
    currentWeather.description = response.data[0].weather.description;
    currentWeather.descriptionCode = response.data[0].weather.code;
    currentWeather.iconCode = response.data[0].weather.icon;
    currentWeather.iconClass = getIconClass(currentWeather.iconCode);
    currentWeatherObj.setCurrentWeather(currentWeather);
}
const getIconClass  = (iconCode) => {
    const iconClasses = {

        't0[1-3]' : ['wi-day-storm-showers',
        'wi-night-alt-storm-showers'],
        't0(4|5)' : ['wi-thunderstorm','wi-night-alt-thunderstorm'],
        'd0[1-3]': ['wi-sleet'],
        '(r0(1|2))|(f01)|(r0(4|6))|u00 ': ['wi-showers'],
        'r03': ['wi-rain','wi-night-alt-rain'],
        'ro5' :['wi-day-rain','wi-night-alt-rain'],
        's0(1|4)' :['wi-day-rain-mix', 'wi-night-alt-rain-mix'],
        's0(2|3)' :['wi-snow'],
        's05' :['wi-day-snow', 'wi-night-alt-snow-wind'],
        'a0[1-6]' :['wi-fog'],
        'c01' :['wi-day-sunny','wi-night-clear'],
        'c0[2-3]' :['wi-day-cloudy', 'wi-night-alt-cloudy'],
        'c04' :['wi-cloudy']

    }

    for (let code in iconClasses){
        const regex = new RegExp(code);
        if (regex.test(iconCode)){
            return correspondantClass(iconClasses[code],iconCode);
            
        }
    }
}
const correspondantClass = (value, code) => {
    //day or night
    if (value.length === 1 || code.charAt(code.length - 1) === 'd'){
        return value[0];
    }else return value[1];
}

export const extractDate = (weatherData) => {
    const date = weatherData.data[0].valid_date;
    currentWeatherObj.setTime(date);
}


const convertTime = (unixTimestampTime, timeZone) => {
    const time = new Date(unixTimestampTime * 1000);
    const options = {
        timeZone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }
    const humanReadableTime = time.toLocaleString('en-US',options);
    return humanReadableTime;
}

export const extractWeatherParameters = (weatherData) => {
    const weatherParameters = {};
    const timezone = weatherData["timezone"];
    const sunriseDate = convertTime(weatherData.data[0].sunrise_ts,timezone);
    weatherParameters.sunrise = sunriseDate;
    const sunsetDate = convertTime(weatherData.data[0].sunset_ts,timezone);
    weatherParameters.sunset = sunsetDate;
    weatherParameters.cloudCoverage = `${weatherData.data[0].clouds}%`;
    weatherParameters.wind= convertToKmh(weatherData.data[0].wind_spd);
    weatherParameters.precipitation= `${weatherData.data[0].pop}%`;
    weatherParameters.humidity= `${weatherData.data[0].rh}%`;
    currentWeatherObj.setWeatherParameters(weatherParameters);
}


const convertToKmh = (speed) => {
    return `${(speed * 3600)/1000}%`;
}


const extractDailyForecast = (weatherData) => {
    const data = [];
    for (let i =1 ; i<7 ; i++ ){
        const obj = {};

        obj.day = getWeekDay(weatherData.data[i].valid_date); 
        obj.icon = weatherData.data[i].weather.icon;
        obj.iconClass = getIconClass(obj.icon);
        obj.highTemp = weatherData.data[i].high_temp;
        obj.lowTemp = weatherData.data[i].low_temp;
        data.push(obj);
        
    }
    currentWeatherObj.setDailyForecast(data);


}

const getWeekDay = (str) => {
    const date = new Date(str);
    const daysOfWeek = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    return daysOfWeek[date.getDay()];
}







