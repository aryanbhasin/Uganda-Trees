import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import TreeCard from '../../../components/tree_card';

export default class TreeCardList extends Component {
  render() {
    return (
      <ScrollView style={styles.cardListScroll}>
        <TreeCard />
        <TreeCard />
        <TreeCard />
      </ScrollView>
    );
  }
}

var styles= StyleSheet.create({
  cardListScroll: {

  }
});
