import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import CapturePic from './Components/CapturePic';

export default class Tag extends Component {
  
  static navigationOptions = { header: null } 

  render(){
    return (
        <CapturePic navigation={this.props.navigation} />
    );
  }
}


