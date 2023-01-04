import logo from './logo.svg';
import './App.scss';
import './index.css';
import 'mana-font/css/mana.css'

import { useApi } from './custom-hook'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Stack from "react-bootstrap/Stack";
import {WeatherDisplay} from "./WeatherDisplay";

import {LocationModal} from "./LocationModal"

export default function App() {

    const { status, data, error } = useApi('/forecast_api/&q=57,-2.15&days=3')
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
                <WeatherDisplay current_weather={data}/>
              )}

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
            <Col><LocationModal /></Col>
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


