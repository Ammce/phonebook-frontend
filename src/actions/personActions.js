import axios from 'axios';

//Init Persons
export const getPersonsCall = () => {
    return dispatch => {
        axios.get('https://phonebookapi.herokuapp.com/api/allPersons')
            .then(response => {
                dispatch(getPersons(response));
            })
            .catch(error => {
                dispatch(errorHandler(error));
            })
    }
}

// GET_PERSONS
export const getPersons = (persons) => {
    return {
        type: 'GET_PERSONS',
        persons
    };
};

//Axios Add Person
export const addPersonCall = (data) => {
    return dispatch => {
        axios.post('https://phonebookapi.herokuapp.com/api/createPerson', data)
            .then(response => {
                dispatch(addPerson(response.data.person))
            })
            .catch(error => {
                dispatch(errorHandler(error))
            })
    }
}

// ADD_PERSON
export const addPerson = (data) => {
    return {
        type: 'ADD_PERSON',
        person: data
    }
}

// UPDATE_PERSON

export const updatePersonCall = personData => {
    return dispatch => {
        axios.patch('https://phonebookapi.herokuapp.com/api/updatePerson', personData)
            .then(response => {
                dispatch(updatedPerson(response.data))
            })
            .catch(error => {
                dispatch(errorHandler(error));
            })
    }
}

export const updatedPerson = person => {
    return {
        type: 'UPDATE_PERSON',
        person
    }
}


// DELETE_PERSON

export const deletePersonCall = personID => {
    return dispatch => {
        let url = 'https://phonebookapi.herokuapp.com/api/deletePerson/' + personID;
        axios.delete(url)
            .then(response => {
                dispatch(deletePerson(response.data.deleted._id))
            })
            .catch(error => {
                dispatch(errorHandler(error));
            })
    }
}

export const deletePerson = personID => {
    return {
        type: 'DELETE_PERSON',
        personID
    }
}

// ERROR_HANDLER
export const errorHandler = (myError) => {
    return {
        type: 'ERROR_HANDLER',
        myError
    }
}