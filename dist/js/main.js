import {extractCurrentWeather,
    extractDate,
    extractWeatherParameters,
    currentWeatherObj
}from './dataFunctions.js';


const initApp =() =>{

    const inputElement = $('input');

    const  handleSearch = async() => {
        inputElement.fadeToggle();
        const city = inputElement.val();
        if(city && city !== currentWeatherObj.currentWeather.cityName){
            await displayCurrentWeather(city);
            displayDate(city);
            setBackgroundImg();
            displayParameters(city);
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
    await extractDate(city);
    const arr = currentWeatherObj.getTime().split(",");
    $("#date").text(arr[0]);
}

const setBackgroundImg = () => {
    const desCode = Number(currentWeatherObj.currentWeather.descriptionCode);
    const iconCode = currentWeatherObj.currentWeather.iconCode;

    switch (desCode) {
        case (200<=desCode && desCode<=500 || desCode === 900) :
            addImg("rainy");
            break;
        case (600<=desCode && desCode<=623) :
            addImg("snowy");
            break;
        case (700<= desCode && desCode<=751) :
            addImg("foggy");
            break;
        case (800<=desCode && desCode<=802) :
            if(iconCode.charAt(iconCode.length - 1) === 'd'){
                addImg("sunny");
            }else{
                addImg("clear-night");
            }
            break;
        case 804 || 803:
            addImg("cloudy");
            break;
        default:
            break;
    }
}

const addImg = (str) =>{
    $('html').addClass(str);
    $('body').addClass(str);

}

const displayParameters = async(city) => {
    await extractWeatherParameters(city);
    const parameters = currentWeatherObj.getWeatherparameters();
    $('#sunrise-value').text(parameters.sunrise);
    $('#sunset-value').text(parameters.sunset);
    $('#cloud-coverage-value').text(parameters.cloudCoverage);
    $('#wind-value').text(parameters.wind);
    $('#precip-value').text(parameters.precipitation);
    $('#humidity-value').text(parameters.humidity);
}
