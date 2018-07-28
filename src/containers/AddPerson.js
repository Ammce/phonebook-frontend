import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

//Importing actions
import { addPersonCall } from '../actions/personActions';

//Importing Components
import Error from '../components/Error';

class AddPerson extends Component {

    // Initial state
    state = {
        name: '',
        surname: '',
        city: '',
        address: '',
        phone: '',
        error: null,
        added: false
    };

    // == Controling the Adding a person functionality == //

    // Function to handle the change of inputs
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Function to close the alert
    closeAlert() {
        this.setState({ added: false });
    }

    // Function to handle the submiting the form to add a new Person
    handleSubmit(e) {
        e.preventDefault();

        //Handling validation 
        const { name, surname, phone } = this.state;

        console.log(phone.length)
        if (typeof name !== 'string' || name.length < 4) {
            this.setState({ error: 'The name must be minimum 5 characters of length and consist strings only' })
        }
        else if (typeof surname !== 'string' || surname.length < 4) {
            this.setState({ error: 'The surname must be minimum 5 characters of length and consist strings only' })
        }
        else if (phone.length < 4) {
            this.setState({ error: 'Minimum 5 numbers required' })
        }
        else {
            //End of validation
            this.props.addPerson(this.state);
            this.setState({
                name: '',
                surname: '',
                city: '',
                address: '',
                phone: '',
                error: null,
                added: true,
            });
        }
    }

    // == END Controling the Adding a person functionality == //

    render() {
        return (
            <div>
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Add Person</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <form onSubmit={(e) => { this.handleSubmit(e) }}>
                            <FormGroup>
                                <FormControl type="text" required name='name' value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Name" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" required name='surname' value={this.state.surname} onChange={this.handleChange.bind(this)} placeholder="Surname" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" required name='city' value={this.state.city} onChange={this.handleChange.bind(this)} placeholder="City" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" required name='address' value={this.state.address} onChange={this.handleChange.bind(this)} placeholder="Address" />
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" pattern="\d+" required name='phone' value={this.state.phone} onChange={this.handleChange.bind(this)} placeholder="Phone" />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" bsStyle="success">Add Person</Button>
                            </FormGroup>
                        </form>
                        <Error errorText={this.state.error} added={this.state.added} closeAlert={this.closeAlert.bind(this)} />
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPerson: (data) => dispatch(addPersonCall(data))
    }
}

const ConnectedAddPerson = connect(mapStateToProps, mapDispatchToProps)(AddPerson);

export default ConnectedAddPerson 