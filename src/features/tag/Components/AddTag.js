import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';
import Spinner from 'UgandaTrees/src/components/spinner'
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob'

import TagSpecies from './TagSpecies';
import TagMapView from './TagMapView';

import {firebaseApp} from 'UgandaTrees/App'
import {getLocation, resetLocation} from 'UgandaTrees/src/actions';

import {AddTagStyles as styles} from '../styles';

const uuidv1 = require('uuid/v1');
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class AddTag extends Component {

  componentDidMount() {
    this.props.getLocation();
  }
  
  state = {
    uploadingTag: false
  }
  
  // need to clean this code, improve readibility
  uploadTag(species, coords, imageUri, imageKey) {
    var tagListRef = firebaseApp.database().ref('tags/' + species.toLowerCase());
    var newTagRef = tagListRef.push();
    
    var imageRef = firebaseApp.storage().ref('images/' + species.toLowerCase() + `/${imageKey}.jpg`);
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    
    const imageFile = RNFetchBlob.wrap(uploadUri);      
    Blob.build(imageFile, { type: 'image/jpg;' }).then((imageBlob) => {
      var uploadTask = imageRef.put(imageBlob, { contentType: 'image/jpg' });
      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done'); // Task progress
      }, (error) => console.READ_EXTERNAL_STORAGE(error)
      , () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          newTagRef.set({
              key: imageKey,
              imageUri: downloadURL,
              coords: coords
            }, (error) => {
              if (error) {alert('Error submitting tag. Please Try again')}
              else {
                showMessage({
                  message: "Tag uploaded",
                  type: "success",
                  icon: "success",
                  duration: 1800
                });
                setTimeout(() => {this.props.navigation.navigate('CapturePic')}, 1800);
                this.setState({uploadingTag: false})
              }
            }
          );
        } );
      });
    })

  }
  
  submitTag(species, coords, imageUri) {
    if (species === '') {
      return alert('Please choose a tree species');
    }
    this.setState({uploadingTag: true})
    
    imageKey = uuidv1();

    this.uploadTag(species, coords, imageUri, imageKey)
    
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
        {this.state.uploadingTag && (
          <View style={{...StyleSheet.absoluteFill}}>
            <Spinner />
          </View>
        )}
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
