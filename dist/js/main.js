import {getCurrentWeather} from './dataFunctions.js';

const initApp =() =>{
    $('#search-button').click(setCurrentWeather);
/*     setParameters();
    setBackgroundImg(); */

}
$(document).ready(initApp);


const setCurrentWeather = async() => {
    const city = $("input").val();
    const currentWeatherObj = await getCurrentWeather(city);
    $("#city").text(currentWeatherObj.cityName);
    $("#temperature").text(currentWeatherObj.temperature);
    $("#description").text(currentWeatherObj.description);
    addIcon(currentWeatherObj.iconClass);
}

const addIcon = (iconClass) => {
    const icon = document.createElement("i");
    icon.classList.add("wi");
    icon.classList.add(`${iconClass}`);
    const span = document.createElement("span");
    span.setAttribute("id", "description-icon");
    span.append(icon);
    $("#description").append(span);

}
