import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
//Importing components
import AddPerson from './containers/AddPerson';
import Persons from './containers/Persons';

class Application extends Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={12} md={4}> <AddPerson /> </Col>
                    <Col sm={12} md={8}> <Persons /> </Col>
                </Row>
            </Grid>
        );
    }
}

export default Application;
