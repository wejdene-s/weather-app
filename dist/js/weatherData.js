export default class weatherData{
    constructor(){
        this.currentWeather ={};
        this.time="";
        this.weatherParameters ={};
        this.dailyForecast = [];
    }

    setCurrentWeather (currentWeather){
        this.currentWeather = currentWeather;
    }

    getCurrentWeather (){
        return this.currentWeather;
    }

    setTime (time){
        this.time = time;
    }

    getTime(){
        return this.time;
    }

    setWeatherParameters (parameters){
        this.weatherParameters = parameters;
    }
    
    getWeatherparameters (){
        return this.weatherParameters;
    }

    setDailyForecast (dailyForecast){
        this.dailyForecast.push(dailyForecast);
    }
    
    getDailyForecast (){
        return this.dailyForecast;
    }

}