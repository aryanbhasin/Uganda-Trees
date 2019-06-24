import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {styles} from '../../styles';

export class BasicInfo extends Component {
  
  description = (desc) => {
    if (!!desc) {
      return (<Text style={styles.bodyText}>{desc}</Text>);
    }
  }
  ecology = (ecology) => {
    if (!!ecology) {
      return (
        <View>
          <Text style={styles.bodyHeader}>Ecology</Text>
          <Text style={styles.bodyText}>{ecology}</Text>
        </View>
      );
    }
  }
  uses = (uses) => {
    if (!!uses) {
      text = '';
      uses.map((use) => text = text + use + ', ')
      text = text.charAt(0).toUpperCase() + text.slice(1);
      return (
        <View>
          <Text style={styles.bodyHeader}>Uses</Text>
          <Text style={styles.bodyText}>{text}</Text>
        </View>
      );
    }
  }
  propagation = (propagation) => {
    if (!!propagation) {
      return (
        <View>
          <Text style={styles.bodyHeader}>Propagation</Text>
          <Text style={styles.bodyText}>{propagation}</Text>
        </View>
      );
    }
  }
  remarks = (remarks) => {
    if (!!remarks) {
      return (
        <View>
          <Text style={styles.bodyHeader}>Remarks</Text>
          <Text style={styles.bodyText}>{remarks}</Text>
        </View>
      );
    }
  }
  render() {
    const {treeData} = this.props;
    return (
      <ScrollView style={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        {this.description(treeData.Description)}
        {this.uses(treeData.Uses)}
        {this.propagation(treeData.Propagation)}
        {this.ecology(treeData.Ecology)}
        {this.remarks(treeData.Remarks)}
      </ScrollView>
    );
  }
}

export class Stats extends Component {
  
  renderRow(object, key, index) {
    var statText = object[key];
    statText = statText.charAt(0).toUpperCase() + statText.slice(1);
    return (
      <View key={index} style={styles.rowContainerStyle}>
        <Text style={styles.partHeader}>{key}</Text>
        <Text style={styles.partInfo}>{statText}</Text>
      </View>
    );
  }
  
  render() {
    const {parts} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(parts).map((key, index) => this.renderRow(parts, key, index))}
      </ScrollView>
    );
  }
}