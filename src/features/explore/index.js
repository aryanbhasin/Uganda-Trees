import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TreeCardList from './components/TreeCardList';
import Searchbar from './components/Searchbar';

export default class Explore extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Searchbar />
        <TreeCardList />
        
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
});