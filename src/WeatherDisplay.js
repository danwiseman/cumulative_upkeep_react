import ListGroup from "react-bootstrap/ListGroup";
import {CardGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CartFill, CloudFill, Droplet, ThermometerHalf, Wind} from 'react-bootstrap-icons';


export function WeatherDisplay(props) {
    console.log(props)

    const temperature = props.weather_data.current.temp_c;
    const weather_tag = props.weather_data.current.weather_tag;
    const feels_like = props.weather_data.current.feels_like_c;
    const humidity = props.weather_data.current.humidity;
    const wind_speed = props.weather_data.current.wind_speed_kph;
    const location = props.weather_data['location'].name + ', ' + props.weather_data['location'].region
    const current_card_data = props.card_data.now[0];

    return (

            <Row g={0}>
                <Col md={6} className="WeatherCardImage">
                    <img alt={current_card_data.card_name} src={current_card_data.card_images.png}
                        className="img-fluid rounded-start"/>
                </Col>
                <Col md={6}>

                    <Card.Body>
                        <Card.Title><i className="ms ms-land"></i> { location }</Card.Title>
                        <Card.Text>
                        <ListGroup>
                            <ListGroupItem><WeatherIconForTag tag={weather_tag} /> {weather_tag}</ListGroupItem>
                            <ListGroupItem><ThermometerHalf /> Temperature: {temperature}</ListGroupItem>
                            <ListGroupItem><Droplet /> Humidity: {humidity}</ListGroupItem>
                            <ListGroupItem><Wind /> Wind: {wind_speed}</ListGroupItem>
                            <ListGroupItem>Feels Like: {feels_like}</ListGroupItem>

                        </ListGroup>
                            <WeatherForecast forecast={props.weather_data.forecast} card_data={props.card_data}/>
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="primary">
                                <CartFill /> Buy {current_card_data.card_name} at store
                            </Button>

                        </Card.Footer>
                    </Card.Body>
                </Col>
            </Row>

    );
}

export function WeatherForecast(props) {
    if (props.card_data === undefined) {
        return (
            <Stack direction="horizontal" className="mx-auto my-2">
                <CardGroup>

                </CardGroup>
            </Stack>
        )
    }
    return (
        <Stack direction="horizontal" className="mx-auto my-2">
            <CardGroup>
                <WeatherForecastItem forecast={props.forecast.today} card_data={props.card_data.today}/>
                <WeatherForecastItem forecast={props.forecast.tomorrow} card_data={props.card_data.tomorrow}/>
                <WeatherForecastItem forecast={props.forecast.next_day} card_data={props.card_data.next_day}/>
            </CardGroup>
        </Stack>
        );
}

function WeatherForecastItem(props) {
    console.log(props)
    let small_card_image = "https://cards.scryfall.io/small/front/d/b/db50f988-da46-4b9b-9cc5-78497df2df8b.jpg?1604198469"

    if(props.card_data !== undefined) {
        if (props.card_data.length > 0) {
            small_card_image = props.card_data[0].card_images.small;
        }
    }
    return(

        <Card mb={2} bg="dark">
            <Card.Body>
                <Card.Title>{props.forecast.date}</Card.Title>
                <Card.Text p={0}>
                    <img src={small_card_image} alt={props.forecast.weather_tag} className="rounded-3"/>
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