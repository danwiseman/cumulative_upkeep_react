import logo from './logo.svg';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {WeatherDisplay, WeatherForecast} from './WeatherDisplay'

const GET_WEATHERCARDS = gql`
    query GetAllWeatherCards {
        allWeatherCards {
            sf_id
            card_name
            card_images {
                png
                normal
                large
                small
            }
            weather_tags
            temperature_range {
                min
                max
            }
        }
    }
`

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

export default function App() {
  return (
      <main>
      <header className="p-3 text-bg-dark">
          <Container><DisplayHeader /></Container>
      </header>
      <Container fluid>

          <Row>
            <Col>
                <DisplayWeatherCardByWeather tagsList={"cloudy"} temperature={17} />
            </Col>
          </Row>
          <Row>
              <Col>
                  <WeatherForecast forecast={[
                      {"day": "Monday", "temp": 14, "tags": "sunny", "image": "image.jpb"},
                      {"day": "Tuesday", "temp": 14, "tags": "sunny", "image": "image.jpb"}
                  ]} />
              </Col>
          </Row>
      </Container>
      </main>
  );
}

function DisplayHeader() {
    return (
        <Row>
            <Col>
                <h2>Cumulative Upkeep 🚀</h2>
            </Col>
        </Row>
    );
}

function DisplayWeatherCards() {
    const { loading, error, data } = useQuery(GET_WEATHERCARDS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.allWeatherCards.map(({ card_name, card_images }) => (
        <div key={card_name}>
            <h3>{card_name}</h3>
            <img alt="location-reference" src={`${card_images.png}`} />
            <br />

        </div>
    ));
}

function DisplayWeatherCardByWeather({ tagsList, temperature }) {
    const { loading, error, data } = useQuery(GET_WEATHERCARDSBYTAGANDTEMP, {

        variables: { tagsList, temperature },

    });


    if (loading) return null;

    if (error) return `Error! ${error}`;


    return data.weatherCardsByTagsAndTemp.map(({ card_name, card_images }) => (
        <WeatherDisplay card_name={card_name} card_image_src={card_images.png} weather_tags={tagsList} temperature={temperature} />
    ));
}


function GetZipCodeForm() {
    return (
        <div className="GetZipCode">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicZip">
                    <Form.Control type="zipcode" placeholder="Enter Zipcode" />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}