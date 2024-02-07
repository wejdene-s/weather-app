import {API_KEY} from './config.js';

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

}


