

export const weather_data = (api_data) => {
    const parsed_weather_data = {
        current: {
            temp_c: api_data['current'].temp_c,
            temp_f: api_data['current'].temp_f,
            weather_tag: api_data['current'].condition.text,
            feels_like_c: api_data['current'].feelslike_c,
            feels_like_f: api_data['current'].feelslike_f,
            humidity: api_data['current'].humidity,
            wind_speed_kph: api_data['current'].wind_kph,
        },
        location: api_data['location'],
        forecast: {
            today: {
                date: api_data['forecast'].forecastday[0].date,
                high_temp_c: api_data['forecast'].forecastday[0].day.maxtemp_c,
                high_temp_f: api_data['forecast'].forecastday[0].day.maxtemp_f,
                low_temp_c: api_data['forecast'].forecastday[0].day.mintemp_c,
                low_temp_f: api_data['forecast'].forecastday[0].day.mintemp_f,
                weather_tag: api_data['forecast'].forecastday[0].day.condition.text,
                avg_temp: api_data['forecast'].forecastday[0].day.avgtemp_c,
            },
            tomorrow: {
                date: api_data['forecast'].forecastday[1].date,
                high_temp_c: api_data['forecast'].forecastday[1].day.maxtemp_c,
                high_temp_f: api_data['forecast'].forecastday[1].day.maxtemp_f,
                low_temp_c: api_data['forecast'].forecastday[1].day.mintemp_c,
                low_temp_f: api_data['forecast'].forecastday[1].day.mintemp_f,
                weather_tag: api_data['forecast'].forecastday[1].day.condition.text,
                avg_temp: api_data['forecast'].forecastday[1].day.avgtemp_c,
            },
            next_day: {
                date: api_data['forecast'].forecastday[2].date,
                high_temp_c: api_data['forecast'].forecastday[2].day.maxtemp_c,
                high_temp_f: api_data['forecast'].forecastday[2].day.maxtemp_f,
                low_temp_c: api_data['forecast'].forecastday[2].day.mintemp_c,
                low_temp_f: api_data['forecast'].forecastday[2].day.mintemp_f,
                weather_tag: api_data['forecast'].forecastday[2].day.condition.text,
                avg_temp: api_data['forecast'].forecastday[2].day.avgtemp_c,
            },
        },
    };

    return parsed_weather_data;
}