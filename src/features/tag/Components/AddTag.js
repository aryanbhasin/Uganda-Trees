import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';

import TagSpecies from './TagSpecies';
import TagMapView from './TagMapView';

import {firebaseApp} from 'UgandaTrees/App'
import {getLocation, resetLocation} from 'UgandaTrees/src/actions';

import {AddTagStyles as styles} from '../styles';

const uuidv1 = require('uuid/v1');

class AddTag extends Component {

  componentDidMount() {
    this.props.getLocation();
  }
  
  submitTag(species, coords, imageUri) {
    if (species === '') {
      return alert('Please choose a tree species');
    }
    var tagListRef = firebaseApp.database().ref('tags/' + species.toLowerCase());
    var newTagRef = tagListRef.push();
    newTagRef.set({
      key: uuidv1(),
      imageUri: imageUri,
      coords: coords
    });
  }
  
  render() {
    const imageUri = this.props.navigation.getParam('imageUri');
    const {species, coords} = this.props;
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.container_top}>
          <View style={{padding: 10}}>
            <Image source={{uri: imageUri}} width={100} style={styles.capturedImage}/>
          </View>
          <TagSpecies />
        </View>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
            <TagMapView />
        </View>
        <View style={styles.container_buttons}>
          <View style={styles.buttonView}>
            <Button title="Get Location" onPress={() => this.props.getLocation()}/>
          </View>
          <View style={styles.buttonView}>
            <Button title="Submit Tag" onPress={() => this.submitTag(species, coords, imageUri)}/>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coords: state.newTagInfo.coords,
    species: state.newTagInfo.species,
  }
}

const mapDispatchToProps = {
  getLocation: getLocation,
  resetLocation: resetLocation,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
