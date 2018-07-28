import React from 'react';
import { Alert } from 'react-bootstrap';

//Function that will check for potential error with updating the user and display it
const ErrorUpdate = (props) => {
    if (!props.displayError) return null
    else {
        return (
            <Alert bsStyle="danger">
                {props.displayError}
            </Alert>
        );
    }
}

export default ErrorUpdate;