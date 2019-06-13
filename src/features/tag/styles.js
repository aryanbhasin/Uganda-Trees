import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles.js';

export var CapturePicStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
  },
  imgBG: {
    alignSelf: 'center', 
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT, 
    resizeMode: 'cover'
  },
  crossIcon: {
    position: 'absolute',
    bottom: 100,
    left: 20
  },
  checkIcon: {
    position: 'absolute',
    bottom: 100,
    right: 20
  }
});

export var AddTagStyles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  capturedImage: {
    borderWidth: 2, 
    borderColor: '#ff8f00', 
    marginTop: 60
  },
  speciesTextInput: {
    marginTop: 20,
    padding: 10
  }
});