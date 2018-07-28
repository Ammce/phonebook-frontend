import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
//Importing components
import AddPerson from './containers/AddPerson';
import Persons from './containers/Persons';
import About from './components/About';
import NetworkError from './components/NetworkError';

// Component that will execute and organize the GRID Outlook of application
class Application extends Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12}> <About /> </Col>
                    <Col sm={12}> <NetworkError /> </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={12} md={4}> <AddPerson /> </Col>
                    <Col sm={12} md={8}> <Persons /> </Col>
                </Row>
            </Grid>
        );
    }
}

export default Application;
