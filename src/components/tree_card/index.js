import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';

import {styles} from './styles'

export default class TreeCard extends Component {
  
  render() {
    
    StatusBar.setBarStyle('dark-content', true);
    
    const {name} = this.props;
    
    // replace image url and tree name with props
    return (
 
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => {alert('Pressed')}}>
            <View style={styles.cardImageContainer}>
              <Image source={require('../../assets/images/coffea1.jpg')} style={styles.cardImage} />
            </View>
            <View>
              <Text style={styles.cardTitle}>{name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      
    );
  }
}