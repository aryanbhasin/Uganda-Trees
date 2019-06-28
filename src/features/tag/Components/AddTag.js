import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, ScrollView} from 'react-native';
import { Button } from 'react-native-material-ui';
import Image from 'react-native-scalable-image';
import {connect} from 'react-redux';
import Spinner from 'UgandaTrees/src/components/spinner'
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob'

import TagSpecies from './TagSpecies';
import TagMapView from './TagMapView';

import {firebaseApp} from 'UgandaTrees/App'
import {getLocation, resetLocation, setPicURI} from 'UgandaTrees/src/actions';

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
  
  uploadTagInfo(species, coords, tagKey, downloadURL) {
    var curationRef = this.props.curationRequired ? 'tags-to-curate/' : 'tags/';
    var tagListRef = firebaseApp.database().ref(curationRef + species.toLowerCase());
    var newTagRef = tagListRef.push();
    newTagRef.set({
        key: tagKey,
        imageUri: downloadURL,
        coords: coords
      }, (error) => {
        if (error) {alert('Error submitting tag. Please try again')}
        else {
          showMessage({
            message: "Tag uploaded",
            type: "success",
            icon: "success",
            duration: 1800
          });
          setTimeout(() => {
            this.props.setPicURI('');
            // clears the text input field after submitting a tag
            this.textRef.clear();
            this.props.navigation.navigate('CapturePic')
          }, 1800);
          this.setState({uploadingTag: false})
        }
      }
    );
  }
  
  submitTag(species, coords, imageUri) {
    if (species === '') {
      return alert('Please choose a tree species');
    }
    this.setState({uploadingTag: true})

    tagKey = uuidv1();
    var curationRef = this.props.curationRequired ? 'images-to-curate/' : 'images/'; 
    var imageRef = firebaseApp.storage().ref(curationRef + species.toLowerCase() + `/${tagKey}.jpg`);
    const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    
    // Upload Image on Storage
    const imageFile = RNFetchBlob.wrap(uploadUri);      
    Blob.build(imageFile, { type: 'image/jpg;' }).then((imageBlob) => {
      imageRef.put(imageBlob, { contentType: 'image/jpg' }).then((snapshot) => {
        // Extract downloadURL and then upload TagInfo on Realtime DB
        snapshot.ref.getDownloadURL().then((downloadURL) => {this.uploadTagInfo(species, coords, tagKey, downloadURL)});
      })
    })
  }
  
  getRef = (ref) => {
    this.textRef = ref;
  }
  
  tagLocation() {
    this.props.getLocation();
    showMessage({
      message: "Location tagged",
      type: "info",
      icon: "info",
      duration: 1000
    });
  }
  
  render() {
    
    const {species, coords} = this.props;
    const imageUri = this.props.navigation.getParam('imageUri');
    
    return (
                          // remove scrollview when replacing textinput with dropdown for tagging species
      <ScrollView keyboardShouldPersistTaps='never' scrollEnabled={false} contentContainerStyle={{flex: 1}}>
        <View style={styles.container_top}>
          <View style={{padding: 10}}>
            <Image source={{uri: imageUri}} width={100} style={styles.capturedImage}/>
          </View>
          <TagSpecies getRef={this.getRef} />
        </View>
        <View style={{flex: 3.7, justifyContent: 'center', alignItems: 'center'}}>
            <TagMapView />
        </View>
        <View style={styles.container_buttons}>
          <View style={styles.buttonView}>
            <Button primary raised icon='map-pin' iconSet='FontAwesome' text="Tag Location" style={{text: {fontSize: 15}}} 
              onPress={() => this.tagLocation()}/>
          </View>
          <View style={styles.buttonView}>
            <Button primary raised icon='md-send' iconSet='Ionicons' text="Submit Tag" style={{text: {fontSize: 15}}} 
              onPress={() => this.submitTag(species, coords, imageUri)}/>
          </View>
          {/* <View style={styles.buttonView}>
            <Button title="Tag Backup" onPress={() => this.uploadTagInfo(species, coords, uuidv1(), 'temp URL')}/>
          </View> */}
        </View>
        {this.state.uploadingTag && (
          <View style={{...StyleSheet.absoluteFill}}>
            <Spinner />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coords: state.newTagInfo.coords,
    species: state.newTagInfo.species,
    curationRequired: state.newTagInfo.curationRequired
  }
}

const mapDispatchToProps = {
  getLocation: getLocation,
  resetLocation: resetLocation,
  setPicURI: setPicURI,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
