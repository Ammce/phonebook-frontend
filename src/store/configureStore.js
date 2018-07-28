import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import personReducer from '../reducers/personReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(combineReducers({
        persons: personReducer
    }),
        composeEnhancers(applyMiddleware(thunk)));
    return store;
}