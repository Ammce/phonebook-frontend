import React, { Component } from 'react';
import { Table, Button, FormGroup, FormControl, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import moment from 'moment';
import Modal from 'react-responsive-modal';
import ErrorUpdate from '../components/ErrorUpdate';

//Including custom CSS file
import './Persons.css';

//Importing actions
import { getPersonsCall, deletePersonCall, updatePersonCall } from '../actions/personActions';


class Persons extends Component {

    // Initial local state of the component
    state = {
        open: false,
        name: '',
        city: '',
        surname: '',
        phone: '',
        address: '',
        error: null
    };

    // == Lifecycle hooks == //

    componentDidMount() {
        this.props.getPersons();
    }

    // == END Lifecycle hooks == //

    // == Controlling Modal == // 

    // Function to open the modal 
    onOpenModal = () => {
        this.setState({ open: true });
    };

    // Function to close the modal 
    onCloseModal = () => {
        this.setState({ open: false });
    };

    // == END Controlling Modal == // 

    // == Handling the forms and changes within application == //

    // Function to delete person
    handleDelete(e, personID) {
        e.preventDefault();
        this.props.deletePerson(personID);
    }

    //Function to handle change of inputs
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //Function to handle updating person
    handleUpdate(e, person) {
        e.preventDefault();
        this.setState({
            name: person.name,
            surname: person.surname,
            address: person.address,
            city: person.city,
            phone: person.phone,
            personID: person._id
        });
        this.onOpenModal();
    }

    //Function to handle submitting 'add new person'
    handleSubmit(e) {
        e.preventDefault();

        //Handling validation 
        const { name, surname, phone } = this.state;
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
            this.props.updatePerson(this.state);
            this.onCloseModal();
            this.setState({
                error: null
            });
        }
    }

    // == END Handling the forms and changes within application == //

    render() {
        // Checking the state of modal
        const { open } = this.state;
        // Checking whether the persons are loaded from the backend or not. If not, the animation will pop up
        let persons = <RingLoader
            color={'#123abc'}
            loading={this.props.loading}
        />
        if (this.props.loading === false) {
            persons = (
                <div>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Created Date</th>
                                <th>City</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.persons.map(person => {
                                const time = moment(person.createdAt).format('DD/MM/YYYY');
                                return (
                                    <tr key={person._id} >
                                        <td>{person.name}</td>
                                        <td>{person.surname}</td>
                                        <td>{time}</td>
                                        <td>{person.city}</td>
                                        <td>{person.address}</td>
                                        <td>{person.phone}</td>
                                        <td><Button onClick={(e) => { this.handleUpdate(e, person) }} bsStyle="info">Edit</Button> <Button onClick={(e) => { this.handleDelete(e, person._id) }} bsStyle="danger">Delete</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            );
        }
        return (
            <div>
                <Panel bsStyle="success">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">List of Persons</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{persons}</Panel.Body>
                </Panel>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <hr />
                    <h4>Edit Person and then click 'Update Person' to save changes</h4>
                    <hr />
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
                            <FormControl type="text" required name='phone' value={this.state.phone} onChange={this.handleChange.bind(this)} placeholder="Phone" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" bsStyle="success">Update Person</Button>
                        </FormGroup>
                    </form>
                    <hr />
                    <ErrorUpdate displayError={this.state.error} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons.persons,
        loading: state.persons.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPersons: () => dispatch(getPersonsCall()),
        deletePerson: (personID) => dispatch(deletePersonCall(personID)),
        updatePerson: (data) => dispatch(updatePersonCall(data))
    }
}


const ConnectedPersons = connect(mapStateToProps, mapDispatchToProps)(Persons)

export default ConnectedPersons;