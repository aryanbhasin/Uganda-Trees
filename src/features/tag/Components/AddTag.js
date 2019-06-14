import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';
import {SCREEN_WIDTH} from 'UgandaTrees/src/styles/globalStyles.js';
import TagSpecies from './TagSpecies';
import TagMapView from './TagMapView';


import {getLocation, resetLocation} from 'UgandaTrees/src/actions';

import {AddTagStyles as styles} from '../styles';

class AddTag extends Component {

  componentDidMount() {
    this.props.getLocation();
  }
  
  submitTag() {
    
  }
  
  render() {
    const image_uri = this.props.navigation.getParam('imageUri');
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.container_top}>
          <View style={{padding: 10}}>
            <Image source={{uri: image_uri}} width={100} style={styles.capturedImage}/>
          </View>
          <TagSpecies />
        </View>
        <View style={{flex: 4, borderWidth: 2, justifyContent: 'center', alignItems: 'center'}}>
            <TagMapView />
        </View>
        <View style={styles.container_buttons}>
          <View style={styles.buttonView}>
            <Button title="Get Location" onPress={() => this.props.getLocation()}/>
          </View>
          <View style={styles.buttonView}>
            <Button title="Submit Tag" onPress={() => this.submitTag()}/>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.tagInfo.coords.longitude,
    latitude: state.tagInfo.coords.latitude,
  }
}

const mapDispatchToProps = {
  getLocation: getLocation,
  resetLocation: resetLocation,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
