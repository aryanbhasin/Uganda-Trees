import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles.js';

import {getLocation, resetLocation} from 'UgandaTrees/src/actions';

import {AddTagStyles as styles} from '../styles';

class AddTag extends Component {
  
  // componentDidMount() {
  //   this.props.getLocation();
  // }
  
  componentWillUnmount() {
    this.props.resetLocation();
  }
  
  render() {
    const image_uri = this.props.navigation.getParam('imageUri');
    
    return (

        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <Image source={{uri: image_uri}} width={SCREEN_WIDTH * 0.65} style={styles.capturedImage}/>
          </View>
          <View>
            <Input label='Species' placeholder='Enter Tree Species' containerStyle={styles.speciesTextInput} />
          </View>
          <View>
            <Button title="Get Location" onPress={() => this.props.getLocation()}/>
          </View>
          <View>
            <Text>Latitude: {this.props.latitude}</Text>
            <Text>Longitude: {this.props.longitude}</Text>
          </View>
        </ScrollView>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    longitude: state.location.longitude,
    latitude: state.location.latitude,
  }
}

const mapDispatchToProps = {
  getLocation: getLocation,
  resetLocation: resetLocation,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
