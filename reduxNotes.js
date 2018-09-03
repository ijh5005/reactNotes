//npm i redux react-redux redux-thunk

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Contact from './contact';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Contact />
        </div>
      </Provider>
    );
  }
}

export default App;

// contact.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Consumer from 'context';
import GET_CONTACTS from './types';

class Contact extends Component {
  componentDidMount(){
    this.props.getContacts
  }

  render() {
    const { contacts } = this.props;
    return (
      <div>
        {contacts}
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  getContacts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  contacts: state.contact.contacts
});

const mapDispatchToProps = (dispatch) => ({
  getContacts: () => dispatch({ type: GET_CONTACTS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

//store.js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const initialState = {};
const middelware = [];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middelware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;


//reducer/index.js

import { combineReducers } from 'redux';
import contactReducer from './contactReducer';


export default combineReducers({
  contact: contactReducer
});


// contactReducer.js
import { GET_CONTACTS } from './types'

const initialState = {
  contacts: {
    name: 'isaiah harrison',
    email: 'isaiahharrison14@gmail.com'
  }
};

export default function(state = initialState, action){

  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state
      }
    default:
      return state
  }
}

// types.js
export const GET_CONTACTS = 'GET_CONTACTS';
