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
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        // Handle general errors
        console.error('Error:', error);
    }
/*     const response = {  
        "data":[  
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
            {  
                "valid_date":"2017-04-01",
                "ts":1503954000,
                "datetime":"2017-04-01",
                "wind_gust_spd":16.7,
                "wind_spd":6.4,
                "wind_dir":45,
                "wind_cdir":"NE",
                "wind_cdir_full":"northeast",
                "temp":25,
                "max_temp":30,
                "min_temp":26,
                "high_temp":30,
                "low_temp":24.5,
                "app_max_temp":30.64,
                "app_min_temp":23.64,
                "pop":0,
                "precip":0,
                "snow":0,
                "snow_depth":0,
                "slp":1017,
                "pres":1003.5,
                "dewpt":17.8,
                "rh":64.3,
                "weather":{  
                    "icon":"r03n",
                    "code":"804",
                    "description":"Overcast clouds"
                },
                "clouds_low":25,
                "clouds_mid":100,
                "clouds_hi":50,
                "clouds":100,
                "vis":10,
                "max_dhi":178,
                "uv":2,
                "moon_phase":0.99,
                "moon_phase_lunation":0.48,
                "moonrise_ts":1530341260,
                "moonset_ts":1530351260,
                "sunrise_ts":1530321260,
                "sunset_ts":1530391260
            },
        ],
        "city_name":"Raleigh",
        "lon":"-78.63861",
        "timezone":"America\/New_York",
        "lat":"35.7721",
        "country_code":"US",
        "state_code":"NC"
        }

        return response; */
}
export const extractData = async(city) => {
    const response = await getWeatherData(city);
    console.log(response);
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

const convertTime = (unixTimestampTime) => {
    const time = new Date(unixTimestampTime * 1000);
    const humanReadableTime = time.toLocaleString();
    return humanReadableTime;
}

export const extractWeatherParameters = (weatherData) => {
    const weatherParameters = {};
    const sunriseDate = convertTime(weatherData.data[0].sunrise_ts);
    weatherParameters.sunrise = sunriseDate.split(",")[1];
    const sunsetDate = convertTime(weatherData.data[0].sunset_ts);
    weatherParameters.sunset = sunsetDate.split(",")[1];
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
    const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    return daysOfWeek[date.getDay()];
}







