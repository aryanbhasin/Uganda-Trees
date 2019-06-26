import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Favorites from '../features/favorites';
import TreeInfo from '../components/tree_info';

export default createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: "Favorites"
      }
    },
    TreeInfo: {
      screen: TreeInfo
    }
  },
  {
    initialRouteName: 'Favorites'
  }
);