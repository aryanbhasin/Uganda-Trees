import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import TreeCardList from './components/TreeCardList';
import Searchbar from './components/Searchbar';

import TreeInfo from '../../components/tree_info';

export default class Explore extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Searchbar />
        <TreeCardList navigation={this.props.navigation} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  }
});