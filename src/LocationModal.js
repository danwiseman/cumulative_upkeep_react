import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";


export function LocationModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="GetZipCode">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicZip">
                        <Col sm={8} >
                            <Form.Control type="zipcode" placeholder="Enter Location" />
                        </Col>
                        <Button variant="secondary" onClick={handleShow}  column sm={4} >
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Your Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-2" controlId="formBasicZip">
                            <Form.Control type="zipcode" placeholder="Enter Location" />
                            <Button variant="secondary" onClick={handleShow}>
                                    Submit
                                </Button>
                        </Form.Group>
                    </Form>
                    <ListGroup>
                        <ListGroup.Item

                            className="d-flex justify-content-between align-items-start">
                            <div>
                                <div className="fw-bold">Location Name</div>
                                Lat: / Long:
                            </div>
                            <Button variant="primary" onClick={handleClose}>
                                Use This Location
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
