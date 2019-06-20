import React, { Component } from 'react';
import * as firebase from "firebase";
import CheckInit from './CheckInit.js'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './reducers/index';
import thunk from 'redux-thunk';
const store = createStore(combineReducers, compose(applyMiddleware(thunk)));
const config = {
  apiKey: "AIzaSyBqd2lmJTdVxcmAMUtmVjNNOef9JkHCvJA",
  authDomain: "todolist-7a64c.firebaseapp.com",
  databaseURL: "https://todolist-7a64c.firebaseio.com",
  projectId: "todolist-7a64c",
  storageBucket: "todolist-7a64c.appspot.com",
  messagingSenderId: "248405903996"
};
firebase.initializeApp(config);


class App extends Component {
  render(){
    return (
      <Provider store={store}> 
        <CheckInit />
      </Provider>
    );
  }
}

export default App;