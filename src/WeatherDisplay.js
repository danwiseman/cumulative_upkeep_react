import ListGroup from "react-bootstrap/ListGroup";
import {CardGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CartFill, CloudFill, Droplet, ThermometerHalf, Wind} from 'react-bootstrap-icons';
import {weather_data} from "./WeatherApi";
import {gql, useQuery} from "@apollo/client";


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

export function WeatherDisplay(props) {
    console.log(props.current_weather);
    const parsed_weather_data = weather_data(props.current_weather)
    console.log(parsed_weather_data);

    const now_temperature = parsed_weather_data.current.temp_c;
    const now_tagsList = parsed_weather_data.current.weather_tag.toLowerCase();
    const today_temperature = parsed_weather_data.forecast.today.avgtemp;
    const today_tagsList = parsed_weather_data.forecast.today.weather_tag.toLowerCase();
    const tomorrow_temperature = parsed_weather_data.forecast.tomorrow.avgtemp;
    const tomorrow_tagsList = parsed_weather_data.forecast.tomorrow.weather_tag.toLowerCase();
    const next_day_temperature = parsed_weather_data.forecast.next_day.avgtemp;
    const next_day_tagsList = parsed_weather_data.forecast.next_day.weather_tag.toLowerCase();

    const { loading, error, data } = useQuery(GET_WEATHERCARDSBYTAGANDTEMP, {
        variables: {
            now_tagsList, now_temperature,
            today_tagsList, today_temperature,
            tomorrow_tagsList, tomorrow_temperature,
            next_day_tagsList, next_day_temperature
        },
    });


    const temperature = parsed_weather_data.current.temp_c;
    const weather_tag = parsed_weather_data.current.weather_tag;
    const feels_like = parsed_weather_data.current.feels_like_c;
    const humidity = parsed_weather_data.current.humidity;
    const wind_speed = parsed_weather_data.current.wind_speed_kph;
    const location = parsed_weather_data['location'].name + ', ' + parsed_weather_data['location'].region

    console.log(data);

    let current_card;
    if (data) {
        current_card = GetCardDetails(data.now)
    }

    return (

        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
              bg="dark">

                { loading && (
                    <div>idle</div>
                )}
                {error === 'error' && <div>{error}</div>}

                {data && current_card && (

                    <>
                    <Row g={0}>
                    <Col md={6} className="WeatherCardImage">
                        <img alt={current_card.card_name} src={current_card.card_images.png}
                             className="img-fluid rounded-start"/>
                    </Col>
                    <Col md={6}>

                        <Card.Body>
                            <Card.Title><i className="ms ms-land"></i> {location}</Card.Title>
                            <Card.Text>
                                <ListGroup>
                                    <ListGroupItem><WeatherIconForTag tag={weather_tag}/> {weather_tag}</ListGroupItem>
                                    <ListGroupItem><ThermometerHalf/> Temperature: {temperature}</ListGroupItem>
                                    <ListGroupItem><Droplet/> Humidity: {humidity}</ListGroupItem>
                                    <ListGroupItem><Wind/> Wind: {wind_speed}</ListGroupItem>
                                    <ListGroupItem>Feels Like: {feels_like}</ListGroupItem>

                                </ListGroup>

                            </Card.Text>
                            <Card.Footer>
                                <Button variant="primary">
                                    <CartFill/> Buy {current_card.card_name} at store
                                </Button>

                            </Card.Footer>
                        </Card.Body>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} mb={5}>
                        <WeatherForecast forecast={parsed_weather_data.forecast} card_data={data}/>
                    </Col>
                </Row></>
                    )}
        </Card>
    );
}

function GetCardDetails(card_data) {
    if (card_data.length === 0) {
        console.log("no card_data")
        return {
            card_name: "Azusa, Lost but Seeking",
            card_images: {
                small: "https://cards.scryfall.io/small/front/0/b/0b8aff2c-1f7b-4507-b914-53f8c4706b3d.jpg?1596259277",
                normal: "https://cards.scryfall.io/normal/front/0/b/0b8aff2c-1f7b-4507-b914-53f8c4706b3d.jpg?1596259277",
                large: "https://cards.scryfall.io/large/front/0/b/0b8aff2c-1f7b-4507-b914-53f8c4706b3d.jpg?1596259277",
                png: "https://cards.scryfall.io/png/front/0/b/0b8aff2c-1f7b-4507-b914-53f8c4706b3d.png?1596259277"
            }
        }
    } else if (card_data.length > 1) {
        console.log("random card return")
        return card_data[Math.floor(Math.random() * card_data.length)];
    } else {
        console.log("only one card.")
        return card_data[0]
    }
}

export function WeatherForecast(props) {
    if (props.card_data === undefined) {
        return (
                <CardGroup>

                </CardGroup>
        )
    }
    return (
            <CardGroup>
                <WeatherForecastItem forecast={props.forecast.today} card_data={props.card_data.today}/>
                <WeatherForecastItem forecast={props.forecast.tomorrow} card_data={props.card_data.tomorrow}/>
                <WeatherForecastItem forecast={props.forecast.next_day} card_data={props.card_data.next_day}/>
            </CardGroup>
        );
}

function WeatherForecastItem(props) {
    console.log(props)
    const card_data = props.card_data;
    const forecast_card = GetCardDetails(card_data);

    return(

        <Card mb={2}>
            <Card.Body>
                <Card.Title>{props.forecast.date}</Card.Title>
                <Card.Text p={0}>
                    <img src={forecast_card.card_images.small} alt={props.forecast.weather_tag} className="img-fluid rounded-3"/>
                </Card.Text>
            </Card.Body>
        </Card>

    );
}

function WeatherIconForTag(props) {
    const tag_for_icon = props.tag.toLowerCase();
    switch (tag_for_icon) {
        case 'cloudy':
            return (<CloudFill/>)
        case 'clear':
            return (<i className="ms ms-dfc-night"></i>)
        case 'sunny':
            return (<i className="ms ms-dfc-day"></i>)
        default:
            return (<CloudFill/>)
    }
}