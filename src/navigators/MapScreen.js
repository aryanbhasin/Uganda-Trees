import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Map from '../features/map';
import TreeInfo from '../components/tree_info';

export default createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        title: "Map"
      }
    },
    TreeInfo: {
      screen: TreeInfo
    }
  },
  {
    initialRouteName: 'Map'
  }
);