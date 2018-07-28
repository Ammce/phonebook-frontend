import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

//Importing actions
import { addPersonCall } from '../actions/personActions';

class AddPerson extends Component {

    state = {
        name: '',
        surname: '',
        city: '',
        address: '',
        phone: '',

    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addPerson(this.state);
        this.setState({
            name: '',
            surname: '',
            city: '',
            address: '',
            phone: '',
        });
    }

    render() {
        return (
            <div>
                <h4>Add a Person</h4>
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
                        <Button type="submit" bsStyle="success">Add Person</Button>
                    </FormGroup>

                </form>
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