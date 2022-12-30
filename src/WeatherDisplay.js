import ListGroup from "react-bootstrap/ListGroup";
import {CardGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CartFill, CloudFill, Droplet, ThermometerHalf, Wind} from 'react-bootstrap-icons';


export function WeatherDisplay(props) {
    return (
        <Card mb={3} g={5}
              className="WeatherDisplay" border="dark"
        bg="dark">
            <Row g={0}>
                <Col md={6} className="WeatherCardImage">
                    <img alt={props.card_name} src={props.card_image_src}
                        className="img-fluid rounded-start"/>
                </Col>
                <Col md={6}>

                    <Card.Body>
                        <Card.Title>Location</Card.Title>
                        <Card.Text>
                        <ListGroup>
                            <ListGroupItem><CloudFill /> {props.weather_tags}</ListGroupItem>
                            <ListGroupItem><ThermometerHalf /> Temperature: {props.temperature}</ListGroupItem>
                            <ListGroupItem>High: / Low:</ListGroupItem>
                            <ListGroupItem><Droplet /> Humidity: </ListGroupItem>
                            <ListGroupItem><Wind /> Wind: </ListGroupItem>
                            <ListGroupItem>Feels Like: </ListGroupItem>

                        </ListGroup>
                        </Card.Text>
                        <Card.Footer>
                            <Button variant="primary">
                                <CartFill /> Buy {props.card_name} at store
                            </Button>

                        </Card.Footer>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export function WeatherForecast(props) {
    return (
        <Stack direction="horizontal" className="mx-auto my-2">
            <CardGroup>
            {props.forecast.map((forecast_data) => (
                <WeatherForecastItem forecast={forecast_data} />
            ))}
            </CardGroup>
        </Stack>
        );
}

function WeatherForecastItem(props) {
    return(

        <Card mb={2}>
            <img src={props.forecast.image}
                className="card-img-top" />
            <Card.Body>
                <Card.Title>{props.forecast.day}</Card.Title>
            </Card.Body>
        </Card>

    );
}