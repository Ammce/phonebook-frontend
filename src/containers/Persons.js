import React, { Component } from 'react';
import { Table, Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import moment from 'moment';
import Modal from 'react-responsive-modal';

//Importing actions
import { getPersonsCall, deletePersonCall, updatePersonCall } from '../actions/personActions';


class Persons extends Component {
    state = {
        open: false,
        name: '',
        city: '',
        surname: '',
        phone: '',
        address: ''
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.props.getPersons();
    }

    handleDelete(e, personID) {
        e.preventDefault();
        this.props.deletePerson(personID);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

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

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.updatePerson(this.state);
        this.onCloseModal();
    }

    render() {
        const { open } = this.state;
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
                <h4>List of persons</h4>
                {persons}
                <Modal open={open} onClose={this.onCloseModal} center>
                    <hr />
                    <h4>Edit Person and click 'Update Person'</h4>
                    <form onSubmit={(e) => { this.handleSubmit(e) }}>
                        <FormGroup>
                            <FormControl type="text" name='name' value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name='surname' value={this.state.surname} onChange={this.handleChange.bind(this)} placeholder="Surname" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name='city' value={this.state.city} onChange={this.handleChange.bind(this)} placeholder="City" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name='address' value={this.state.address} onChange={this.handleChange.bind(this)} placeholder="Address" />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="text" name='phone' value={this.state.phone} onChange={this.handleChange.bind(this)} placeholder="Phone" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" bsStyle="success">Update Person</Button>
                        </FormGroup>

                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons.persons,
        loading: state.persons.loading
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