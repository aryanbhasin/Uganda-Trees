import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Tag extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});