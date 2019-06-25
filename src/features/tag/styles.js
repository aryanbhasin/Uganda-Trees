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
  captureIconContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center', 
    justifyContent: 'center'
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
  container_top: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  capturedImage: {
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10
  },
  container_buttons: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
    
  },
  buttonView: {
    marginHorizontal: 20,
    marginBottom: 5
  }
});

export var TagSpeciesStyles = StyleSheet.create({
  dropdownContainer: {
    padding: 10,
  },
  dropdown: {
    width: 180
  }
})

export var TagMapViewStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill
  }
})