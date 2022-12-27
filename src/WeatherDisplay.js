import ListGroup from "react-bootstrap/ListGroup";
import {ListGroupItem} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function WeatherDisplay(props) {
    return (
        <Card mb={3} className="WeatherDisplay">
            <Row g={0}>
                <Col md={6}>
                    <img alt={props.card_name} src={props.card_image_src}
                        className="img-fluid rounded-start"/>
                </Col>
                <Col md={6}>
                    <Card.Body>
                        <ListGroup>
                            <ListGroupItem>Temperature: {props.temperature}</ListGroupItem>
                            <ListGroupItem>Tags: {props.weather_tags}</ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export function WeatherForecast(props) {
    return (
        <Stack direction="horizontal" gap={3}>
            {props.forecast.map((forecast_data) => (
                <WeatherForecastItem forecast={forecast_data} />
            ))}
        </Stack>
        );
}

function WeatherForecastItem(props) {
    return(
        <div className="bg-light border">{props.forecast.day}</div>
    );
}