import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Explore from '../features/explore'
import TreeInfo from '../components/tree_info';

export default createStackNavigator(
  {
    Explore: {
      screen: Explore
    },
    TreeInfo: {
      screen: TreeInfo
    }
  },
  {
    initialRouteName: 'Explore'
  }
);