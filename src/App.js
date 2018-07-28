//An app file that setups the Store provider
import React, { Component } from 'react';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import { getPersonsCall, addPerson } from './actions/personActions';

//Importing the components 
import Application from './Application';

// Providing entire application with the store created
const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}

export default App;
