import axios from 'axios';

/* Bellow you can find the content of reducer */

/*
    1. Getting Persons from Server
    2. Adding Person to the database
    3. Update Person to the database
    4. Deleting person from the database
    5. ERROR HANDLER action
*/

// == 1. Getting Persons from Server == //

// Dispatching function : Get all persons from the database
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

// GET_PERSONS action 
export const getPersons = (persons) => {
    return {
        type: 'GET_PERSONS',
        persons
    };
};

// == END Getting Persons from Server == //

// == 2. Adding Person to the database == //

//Dispatching function : Axios Add Person to the database
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

// ADD_PERSON action
export const addPerson = (data) => {
    return {
        type: 'ADD_PERSON',
        person: data
    }
}

// == END Adding Person to the database == //

// == 3. Update Person to the database == //

// Dispatching function : Update person to the database
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

// UPDATE_PERSON action
export const updatedPerson = person => {
    return {
        type: 'UPDATE_PERSON',
        person
    }
}

// == END Update Person to the database == //

// == 4. Deleting person from the database == //

// Dispatching function : delete person from the database with axios
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

// DELETE_PERSON action
export const deletePerson = personID => {
    return {
        type: 'DELETE_PERSON',
        personID
    }
}

// == END Deleting person from the database == //

// == 5. ERROR HANDLER action == //

// Error handler Function
export const errorHandler = (myError) => {
    return {
        type: 'ERROR_HANDLER',
        myError
    }
}

// == END ERROR HANDLER action == //
