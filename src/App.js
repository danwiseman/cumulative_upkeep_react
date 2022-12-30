import logo from './logo.svg';
import './App.scss';
import './index.css';
import 'mana-font/css/mana.css'

import { useState, useEffect } from 'react';

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {WeatherDisplay, WeatherForecast} from './WeatherDisplay'
import Stack from "react-bootstrap/Stack";

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
    const [current_weather, setWeather] = useState([]);
    // useEffect(() => {
    //     const API_key = process.env.REACT_APP_WEATHER_API_KEY;
    //     const WeatherAPIUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=' + process.env.WEATHER_API_KEY + '&units=metric';
    //     fetch(WeatherAPIUrl)
    //
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setWeather(data);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

  return (
      <main className="text-bg-dark">
      <header className="p-3 text-bg-primary">
          <Container><DisplayHeader /></Container>
      </header>
        <Container fluid>

          <Stack gap={2} className="col-md-6 mx-auto my-4">
              <h3><i className="ms ms-ability-haste"></i> Today's Forecast</h3>
                <DisplayWeatherCardByWeather tagsList={"cloudy"} temperature={17} />
              <h3 className="text-light"><i className="ms ms-counter-time"></i> Extended Forecast</h3>
                <WeatherForecast forecast={[
                      {"day": "Monday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/4/c/4c9e8f24-af62-4d13-bfed-a8b3294b64c3.jpg?1572893491"},
                      {"day": "Tuesday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"},
                  {"day": "Wednesday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"},
                  {"day": "Thursday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"},
                  {"day": "Friday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"}
                  ]} />
          </Stack>
        </Container>
        <DisplayFooter />

      </main>
  );
}

function DisplayHeader() {
    return (
        <Row>
            <Col>
                <h2>Cumulative Upkeep <i className="ms ms-w"></i> </h2>
                <h3 className="small">At the beginning of your upkeep, check the weather...</h3>
                <Form>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Use Metric"
                    />
                </Form>
            </Col>
            <Col><GetZipCodeForm /></Col>
        </Row>
    );
}

function DisplayFooter() {
    return (
        <footer className="p-3 text-bg-primary">
            <Container>
                <p>Produced with <i className="ms ms-counter-devotion"></i> by <a href="https://danthedata.engineer">Dan Wiseman</a></p>
                <p>Card Images and data sourced from Scryfall API. Weather sourced from weather api.
                    Icons sourced from Bootstrap, Mana Icons, and Keyrune.</p>
                <p className="small">This site contains unofficial Fan Content permitted
                    under the Wizards of the Coast Fan Content Policy. The content from Magic: The
                    Gathering, including card images, mana symbols, and Oracle text, is copyright
                    Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. Cumulative Upkeep
                    is not produced by or endorsed by Wizards of the Coast.</p></Container>
        </footer>
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