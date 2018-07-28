import React from 'react';
import { PageHeader, Alert } from 'react-bootstrap';

//Stateless component whose purpose is to display some basic informations about application
const About = () => {
    const headerStyles = {
        color: '#3c763d'
    }
    const smallHeaderStyles = {
        color: '#dff0d8'
    }
    return (
        <div>
            <PageHeader style={headerStyles}>
                Phonebook application <small style={smallHeaderStyles}>compassholding.net</small>
            </PageHeader>
            <Alert bsStyle="success">
                This application is running on Heroku free server, so it will take around 30 seconds to run the server because server is going to 'sleep' after every 30 minutes of inactivity.
                GITHUB BACKEND / GITHUB FRONTEND
                </Alert>
        </div>
    );
};

export default About;