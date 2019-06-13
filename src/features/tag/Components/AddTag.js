import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';

import {getLocation, resetLocation} from 'UgandaTrees/src/actions';

import {AddTagStyles as styles} from '../styles';

class AddTag extends Component {
  
  componentWillUnmount() {
    this.props.resetLocation();
  }
  
  render() {
    const image_uri = this.props.navigation.getParam('imageUri');
    this.props.getLocation();
    return (
      <View style={styles.container}>
        <View>
          <Image source={{uri: image_uri}} width={SCREEN_WIDTH * 0.7} style={styles.capturedImage}/>
        </View>
        <View>
          <Input placeholder='Enter Tree Species' containerStyle={styles.speciesTextInput} />
        </View>
        <View>
          <Text>Latitude: {this.props.latitude}</Text>
          <Text>Longitude: {this.props.longitude}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.location)
  return {
    longitude: state.location.longitude,
    latitude: state.location.latitude,
  }
}

const mapDispatchToProps = {
  getLocation: getLocation,
  resetLocation: resetLocation,
}


export default connect(mapStateToProps, mapStateToProps)(AddTag);
