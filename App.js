import React, {Component} from 'react';
import * as firebase from 'firebase';

import EntryPoint from './src';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC4iaKRObc5VfHMlA0yTmlZWmXiwP3x8x8",
  authDomain: "uganda-trees.firebaseapp.com",
  databaseURL: "https://uganda-trees.firebaseio.com",
  projectId: "uganda-trees",
  storageBucket: "uganda-trees.appspot.com",
  messagingSenderId: "825254498106",
  appId: "1:825254498106:web:2f712ea491c7e9c0"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// export var dbRef = firebaseApp.database().ref();

export default class App extends Component {
  
  render() {
    return (
      <EntryPoint />
    );
  }
}



