import {gql, useQuery} from "@apollo/client";
import { WeatherDisplay } from "./WeatherDisplay";
import Card from "react-bootstrap/Card";

const GET_WEATHERCARDSBYTAGANDTEMP = gql`
    query WeatherCardsByTagsAndTemp($tagsList: String, $temperature: Int) {
        weatherCardsByTagsAndTemp(tagsList: $tagsList, temperature: $temperature) {
            card_name
            card_images {
                png
                normal
                large
                small
            }
        }
    }
`


export function DisplayWeatherCardByWeather({ current_weather }) {
    console.log(current_weather)

    const temperature = current_weather['current'].temp_c;
    const tagsList = current_weather['current'].condition.text.toLowerCase();

    const error_card = "https://cards.scryfall.io/normal/front/7/a/7a3f8bc2-ef66-474f-92a3-9c4df1670cec.jpg?1594735984";
    const loading_card = "https://cards.scryfall.io/normal/front/d/b/db50f988-da46-4b9b-9cc5-78497df2df8b.jpg?1604198469"

    const { loading, error, data } = useQuery(GET_WEATHERCARDSBYTAGANDTEMP, {
        variables: { tagsList, temperature },
    });

    if (error) return (
        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">
            <WeatherDisplay card_name="Bad Deal" card_image_src={error_card} weather_data={current_weather} />
        </Card>
    );

    if (loading) return(
        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">
                <WeatherDisplay card_name="loading..." card_image_src={loading_card} weather_data={current_weather} />
        </Card>
    );
    return (
        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">
            {
                data.weatherCardsByTagsAndTemp.map(({ card_name, card_images }) => (
                    <WeatherDisplay card_name={card_name} card_image_src={card_images.png} weather_data={current_weather} />
                ))
        }
        </Card>
    );
}