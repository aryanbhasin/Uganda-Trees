import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {RNCamera} from 'react-native-camera';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import {connect} from 'react-redux';
import ImageResizer from 'react-native-image-resizer';

import {setPicURI} from 'UgandaTrees/src/actions';
import {CapturePicStyles as styles} from '../styles'

class CapturePic extends Component {
    
  state = {
    handleFocusChanged: () => {}
  }

  handleCapturePic = async() => {
    if (this.camera) {
      const options = {quality: 0.1, base64: true};
      const {uri} = await this.camera.takePictureAsync(options);
      this.props.setPicURI(uri);
    }
  }
  
  acceptedPic(imageUri) {
    ImageResizer.createResizedImage(imageUri, 300, 500, 'JPEG', 40).then(response => {
      navigator.geolocation.requestAuthorization();
      this.props.navigation.navigate('AddTag', {imageUri: response.uri})
    })
  }
  
  render(){
    
    const {imageUri} = this.props;
    
    if (imageUri !== '') {
      return (
        <ImageBackground 
          source={{uri: imageUri}} 
          style={styles.imgBG}>
          <View style={styles.crossIcon}>
            <TouchableOpacity onPress={() => this.props.setPicURI('')}>
              <FeatherIcon name='x' color='white' size={42} style={styles.cameraIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.checkIcon}>
            <TouchableOpacity onPress={() => this.acceptedPic(imageUri)}>
              <FeatherIcon name='check' color='white' size={42} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      );
    }
    
    return (
      <View style={styles.container}>
        <RNCamera 
          ref={ref => {this.camera = ref}}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          style={styles.cameraPreview}
          defaultOnFocusComponent={ true }
          onFocusChanged={ this.state.handleFocusChanged }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'This app needs your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.captureIconContainer}>
          <TouchableOpacity onPress={this.handleCapturePic} >
            <FeatherIcon name='camera' size={42} color='white' style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const mapDispatchToProps = {
  setPicURI: setPicURI,

}

const mapStateToProps = (state) => {
  return {
    imageUri: state.newTagInfo.imageUri
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapturePic);
