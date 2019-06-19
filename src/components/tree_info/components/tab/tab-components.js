import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../styles';

export class BasicInfo extends Component {
  render() {
    const {text} = this.props;
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>{text}</Text>
      </View>
    );
  }
}

export class Stats extends Component {
  
  renderRow(object, key, index) {
    return (
      <View key={index} style={styles.rowContainerStyle}>
        <Text style={styles.rowText}>{key}</Text>
        <Text style={styles.rowText}>{object[key]}</Text>
      </View>
    );
  }
  
  render() {
    const {stats} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(stats).map((key, index) => this.renderRow(stats, key, index))}
      </ScrollView>
    );
  }
}