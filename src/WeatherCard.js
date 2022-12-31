import {gql, useQuery} from "@apollo/client";
import { WeatherDisplay } from "./WeatherDisplay";
import Card from "react-bootstrap/Card";
import {weather_data} from './WeatherApi'

const GET_WEATHERCARDSBYTAGANDTEMP = gql`
    query WeatherCardsByTagsAndTemp(
        $now_tagsList: String, $now_temperature: Int,
        $today_tagsList: String, $today_temperature: Int,
        $tomorrow_tagsList: String, $tomorrow_temperature: Int,
        $next_day_tagsList: String, $next_day_temperature: Int
    ) {
        now: weatherCardsByTagsAndTemp(tagsList: $now_tagsList, temperature: $now_temperature) {
            card_name,
            card_images {
                large,
                png
            }
        },
        today: weatherCardsByTagsAndTemp(tagsList: $today_tagsList, temperature: $today_temperature) {
            card_name,
            card_images {
                small
            }
        },
        tomorrow: weatherCardsByTagsAndTemp(tagsList: $tomorrow_tagsList, temperature: $tomorrow_temperature) {
            card_name,
            card_images {
                small
            }
        },
        next_day: weatherCardsByTagsAndTemp(tagsList: $next_day_tagsList, temperature: $next_day_temperature) {
            card_name,
            card_images {
                small
            }
        },
    }
`


export function DisplayWeatherCardByWeather({ current_weather }) {
    console.log(current_weather)

    const parsed_weather_data = weather_data(current_weather)

    const now_temperature = parsed_weather_data.current.temp_c;
    const now_tagsList = parsed_weather_data.current.weather_tag.toLowerCase();
    const today_temperature = parsed_weather_data.forecast.today.avgtemp;
    const today_tagsList = parsed_weather_data.forecast.today.weather_tag.toLowerCase();
    const tomorrow_temperature = parsed_weather_data.forecast.tomorrow.avgtemp;
    const tomorrow_tagsList = parsed_weather_data.forecast.tomorrow.weather_tag.toLowerCase();
    const next_day_temperature = parsed_weather_data.forecast.next_day.avgtemp;
    const next_day_tagsList = parsed_weather_data.forecast.next_day.weather_tag.toLowerCase();

    const error_card = "https://cards.scryfall.io/normal/front/7/a/7a3f8bc2-ef66-474f-92a3-9c4df1670cec.jpg?1594735984";
    const loading_card = "https://cards.scryfall.io/normal/front/d/b/db50f988-da46-4b9b-9cc5-78497df2df8b.jpg?1604198469"

    const { loading, error, data } = useQuery(GET_WEATHERCARDSBYTAGANDTEMP, {
        variables: {
            now_tagsList, now_temperature,
            today_tagsList, today_temperature,
            tomorrow_tagsList, tomorrow_temperature,
            next_day_tagsList, next_day_temperature
        },
    });

    if (error) {
        const error_data = { now: [{ card_name: "Bad Deal", card_images: { png: error_card }}] }
        return(
            <Card mb={3} g={5}
                  className="WeatherDisplay" border="dark"
                  bg="dark">
                <WeatherDisplay card_data={error_data} weather_data={parsed_weather_data} />
            </Card>
        );}
    if (loading) {
        const loading_data = { now: [{ card_name: "Loading", card_images: { png: loading_card }}] }
        return(

        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">
                <WeatherDisplay card_data={loading_data} weather_data={parsed_weather_data} />
        </Card>
    );}

    console.log(data)
    return (
        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">
                    <WeatherDisplay card_data={data} weather_data={parsed_weather_data} />
        </Card>
    );
}