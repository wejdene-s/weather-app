import {
    currentWeatherObj,
    extractData
}from './dataFunctions.js';


const initApp =() =>{

    const inputElement = $('input');

    const  handleSearch = async() => {
        inputElement.fadeToggle();
        const city = inputElement.val();
        if(city && city !== currentWeatherObj.currentWeather.cityName){
            await extractData(city);
            displayCurrentWeather();
            displayDate();
            setBackgroundImg();
            displayParameters();
            displayDailyForecast();
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


const displayCurrentWeather = () => {
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

const displayDate = () => {
    const arr = currentWeatherObj.getTime().split(",");
    $("#date").text(arr[0]);
}

const setBackgroundImg = () => {
    const desCode = Number(currentWeatherObj.currentWeather.descriptionCode);
    const iconCode = currentWeatherObj.currentWeather.iconCode;

    switch (true) {
        case (200<=desCode && desCode<=500 || desCode === 900) :
            addImg("rainy");
            break;
        case (600<=desCode && desCode<=623) :
            addImg("snowy");
            break;
        case (700<= desCode && desCode<=751) :
            addImg("foggy");
            break;
        case (desCode>=800 && desCode<=802) :
            if(iconCode.charAt(iconCode.length - 1) === 'd'){
                addImg("sunny");
            }else{
                addImg("clear-night");
            }
            break;
        case (desCode === 803 || desCode === 804):
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

const displayParameters = () => {
    const parameters = currentWeatherObj.getWeatherparameters();
    $('#sunrise-value').text(parameters.sunrise);
    $('#sunset-value').text(parameters.sunset);
    $('#cloud-coverage-value').text(parameters.cloudCoverage);
    $('#wind-value').text(parameters.wind);
    $('#precip-value').text(parameters.precipitation);
    $('#humidity-value').text(parameters.humidity);
}


const displayDailyForecast = () =>{
    currentWeatherObj.getDailyForecast().forEach(element => {
        const div = document.createElement("div");
        const day = document.createElement("p");
        const icon = document.createElement("i");
        const temp = document.createElement("p");
        day.textContent = element.day;
        icon.classList.add("wi");
        icon.classList.add(`${element.iconClass}`);
        temp.textContent = `${element.highTemp}°/${element.lowTemp}°`;
        div.append(day);
        div.append(icon);
        div.append(temp);
    
        $("#daily-forecast-data").append(div);

        
    });


}



