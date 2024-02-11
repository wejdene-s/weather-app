import {extractCurrentWeather,
    extractTime,
    currentWeatherObj
}from './dataFunctions.js';


const initApp =() =>{

    const inputElement = $('input');

    const handleSearch = () => {
        inputElement.fadeToggle();
        const city = inputElement.val();
        if(city){
            displayCurrentWeather(city);
            displayDate(city);
            
        }
    }

    $('#search-button').click(handleSearch);

    inputElement.keydown(function(event) {
        if (event.key === 'Enter' || event.keyCode === 13){
            event.preventDefault();
            handleSearch();
        }
    })
    
}
$(document).ready(initApp);


const displayCurrentWeather = async(city) => {
    
    await extractCurrentWeather(city);
    $("#city").text(currentWeatherObj.getCurrentWeather().cityName);
    $("#temperature").text(currentWeatherObj.getCurrentWeather().temperature);
    $("#description").text(currentWeatherObj.getCurrentWeather().description);
    addIcon(currentWeatherObj.getCurrentWeather().iconClass);

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

const displayDate = async(city) => {
    await extractTime(city);
    const arr = currentWeatherObj.getTime().split(",");
    $("#date").text(arr[0]);
}

