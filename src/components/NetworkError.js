import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

//A component that is mainly used for handling the server errors 
const NetworkError = (props) => {
    if (!props.myError) return null
    else {
        return (
            <Alert bsStyle="danger"> There is error with a server. Please, try again later </Alert>
        );
    }
}

const mapStateToProps = state => {
    return {
        myError: state.persons.error
    }
}

const NetError = connect(mapStateToProps)(NetworkError)
export default NetError;