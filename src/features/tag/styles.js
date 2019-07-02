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
  },
  cameraIcon: {
    shadowColor: 'slategray',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    }
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
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5
    
  },
  buttonView: {
    marginHorizontal: 20,
    marginBottom: 5
  }
});

export var TagSpeciesStyles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    padding: 10,
  },
  inputOptionText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 19,
    marginBottom: 5
  },
  notsureText: {
    textAlign: 'center',
    fontSize: 11,
    color: 'dimgrey',
    marginHorizontal: 5,
    width: 180,
    position: 'relative',
    bottom: 20,
  },
  dropdownSize: {
    width: 180
  },
  textinputPos: {
    width: 180,
    position: 'relative', 
    bottom: 20,
  }
})

export var TagMapViewStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFill
  }
})