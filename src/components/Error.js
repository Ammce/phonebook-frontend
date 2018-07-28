import React from 'react';
import { Alert, Badge } from 'react-bootstrap';

//Stateless component that is required to display any Error if occurs or Success if there is no Errors
const Error = (props) => {
    if (!props.errorText && props.added === false) {
        return null;
    }
    else if (props.errorText) {
        return (
            <Alert bsStyle="danger">
                {props.errorText}
            </Alert>
        );
    }
    else {
        const styleIng = {
            cursor: 'pointer'
        }
        return (
            <Alert bsStyle="success">
                New Person added successifully! Check it out in a list. <Badge style={styleIng} onClick={props.closeAlert}> X </Badge>
            </Alert>
        );
    }
}

export default Error;