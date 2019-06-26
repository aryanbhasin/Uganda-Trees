import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Tag from '../features/tag/'
import AddTag from '../features/tag/components/AddTag';

export default createStackNavigator(
  {
    CapturePic: {
      screen: Tag,
    },
    AddTag: {
      screen: AddTag
    }
  },
  {
    initialRouteName: 'CapturePic'
  }
);