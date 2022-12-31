import logo from './logo.svg';
import './App.scss';
import './index.css';
import 'mana-font/css/mana.css'

import { useApi } from './custom-hook'

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {WeatherDisplay, WeatherForecast} from './WeatherDisplay'
import { DisplayWeatherCardByWeather } from'./WeatherCard';
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

export default function App() {
    // const [current_weather, setWeather] = useState([]);
    // const [forecast_weather, setForecast] = useState([]);
    // useEffect(() => {
    //     const WeatherAPIUrl = '/weather_api/&q=57,-2.15';
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
    //     const WeatherForecastAPIUrl = '/forecast_api/&q=57,-2.15&days=7';
    //     fetch(WeatherForecastAPIUrl)
    //
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setForecast(data);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

    const { status, data, error } = useApi('/weather_api/&q=57,-2.15')
    console.log(status)
  return (
      <main className="text-bg-dark">
      <header className="p-3 text-bg-primary">
          <Container><DisplayHeader /></Container>
      </header>
        <Container fluid>

          <Stack gap={2} className="col-md-6 mx-auto my-4">
              <h3><i className="ms ms-ability-haste"></i> Today's Forecast</h3>
              {status === 'idle' && (
                  <div> Let's get started by searching for an article! </div>
              )}
              {status === 'error' && <div>{error}</div>}
              {status === 'fetching' && <div className="loading"></div>}
              {status === 'fetched' && (
                <DisplayWeatherCardByWeather current_weather={data}/>
              )}




              <h3 className="text-light"><i className="ms ms-counter-time"></i> Extended Forecast</h3>
                <WeatherForecast forecast={[
                      {"day": "Monday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/4/c/4c9e8f24-af62-4d13-bfed-a8b3294b64c3.jpg?1572893491"},
                      {"day": "Tuesday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"},
                  {"day": "Wednesday", "temp": 14, "tags": "sunny", "image": "https://cards.scryfall.io/small/front/5/2/5294d359-c599-40ed-9e06-2a3cc8624d6a.jpg?1576384783"}
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
                <p>Card Images and data sourced from Scryfall API. Weather sourced from <a href="https://www.weatherapi.com">WeatherAPI</a>.
                    Icons sourced from Bootstrap, Mana Icons, and Keyrune.</p>
                <p className="small">This site contains unofficial Fan Content permitted
                    under the Wizards of the Coast Fan Content Policy. The content from Magic: The
                    Gathering, including card images, mana symbols, and Oracle text, is copyright
                    Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. Cumulative Upkeep
                    is not produced by or endorsed by Wizards of the Coast.</p></Container>
        </footer>
    );
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