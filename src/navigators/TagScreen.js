import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Tag from '../features/tag/'
import AddTag from '../features/tag/components/AddTag';

export default createStackNavigator(
  {
    CapturePic: {
      screen: Tag,
      navigationOptions: {
        title: "Capture"
      }
    },
    AddTag: {
      screen: AddTag
    }
  },
  {
    initialRouteName: 'CapturePic'
  }
);