import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import personReducer from '../reducers/personReducer';

// Setting up React Redux developer tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Function to create store and execute it together with combining reducers and applying middlewares, in this case thunk for asnyc calls
export default () => {
    const store = createStore(combineReducers({
        persons: personReducer
    }),
        composeEnhancers(applyMiddleware(thunk)));
    return store;
}