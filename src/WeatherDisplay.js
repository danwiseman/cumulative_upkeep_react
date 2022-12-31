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

    const temperature = props.weather_data['current'].temp_c;
    const weather_tag = props.weather_data['current'].condition.text;
    const feels_like = props.weather_data['current'].feelslike_c;
    const humidity = props.weather_data['current'].humidity;
    const wind_speed = props.weather_data['current'].wind_kph;
    const location = props.weather_data['location'].name + ', ' + props.weather_data['location'].region

    return (

            <Row g={0}>
                <Col md={6} className="WeatherCardImage">
                    <img alt={props.card_name} src={props.card_image_src}
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
                            <WeatherForecast forecast={props.weather_data.forecast} />
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="primary">
                                <CartFill /> Buy {props.card_name} at store
                            </Button>

                        </Card.Footer>
                    </Card.Body>
                </Col>
            </Row>

    );
}

export function WeatherForecast(props) {
    return (
        <Stack direction="horizontal" className="mx-auto my-2">
            <CardGroup>
            {props.forecast.forecastday.map((forecast_data) => (
                <WeatherForecastItem forecast={forecast_data} />
            ))}
            </CardGroup>
        </Stack>
        );
}

function WeatherForecastItem(props) {
    return(

        <Card mb={2}>

            <Card.Body>
                <Card.Title>day</Card.Title>
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