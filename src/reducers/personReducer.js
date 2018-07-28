// Person Reducer //

// Initializing the default state for person
const personReducerDefaultState =
{
    persons: [],
    error: null,
    loading: true
};

const personReducer = (state = personReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_PERSONS':
            return {
                ...state,
                persons: action.persons.data.persons,
                loading: false,
                error: null
            }
        case 'ADD_PERSON':
            return {
                ...state,
                error: null,
                persons: [...state.persons, { _id: action.person._id, name: action.person.name, surname: action.person.surname, city: action.person.city, address: action.person.address, phone: action.person.phone }]
            }
        case 'UPDATE_PERSON':
            state.persons.filter(person => {
                if (person._id === action.person.person._id) {
                    person.name = action.person.person.name;
                    person.surname = action.person.person.surname;
                    person.address = action.person.person.address;
                    person.city = action.person.person.city;
                    person.phone = action.person.person.phone;
                    return {
                        ...state,
                        person,
                        error: null
                    };
                }
            })
        case 'DELETE_PERSON':
            const newArray = state.persons.filter(person => {
                return action.personID !== person._id
            })
            return {
                ...state,
                persons: newArray,
                error: null
            }
        case 'ERROR_HANDLER':
            return {
                ...state,
                error: action.myError
            }
        default:
            return state;
    }
}

export default personReducer