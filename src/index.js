import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import ExploreScreen from './features/explore';
import FavoritesScreen from './features/favorites';
import TagScreen from './features/tag';

import reducer from './reducers/reducer'

const store = createStore(reducer);


const RootTabNav = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreScreen
    },
    Tag: {
      screen: TagScreen
    },
    Favorites: {
      screen: FavoritesScreen
    }
  },
  {
    initialRouteName: 'Explore'
  }
);

const AppContainer = createAppContainer(RootTabNav);

class EntryPoint extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
      
    );
  }
}

export default EntryPoint;